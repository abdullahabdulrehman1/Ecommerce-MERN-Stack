import productmodel from "../models/productmodel.js";
import fs from "fs";
import slugify from "slugify";
import categorymodel from "../models/categorymodel.js";
export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping ||
      !photo
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const existingProduct = await productmodel.findOne({
      name,
    });
    if (existingProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Product already exists" });
    }
    const productmodelcategory = await categorymodel.findOne({
      name: slugify(category),
    });
    const product = new productmodel({
      ...req.fields,
      category: productmodelcategory._id,
      slug: slugify(name),
      photo: {
        data: fs.readFileSync(photo.path),
        contentType: photo.type,
      },
    });

    const savedProduct = await product.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: "" + err.message });
  }
};

//get all progduct
export const getAllProductController = async (req, res) => {
  try {
    const getproduct = await productmodel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(10)
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, getproduct });
  } catch (err) {
    console.log("get all product error: " + err);
    res.status(400).json({ success: false, message: err.message });
  }
};
//get single product
export const getSingleProductController = async (req, res) => {
  try {
    // const {slug} = req.params.slug;
    // console.log(slug)
    // const slug = slugify(name);
    const singleProduct = await productmodel
      .findOne({ slug: req.params.slug })
      .populate("category")
      .select("-photo")
      .limit(10)
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, singleProduct });
  } catch (e) {
    console.log("get single product error: " + e);
    res.status(400).json({ success: false, message: e.message });
  }
};
export const productPhotoController = async (req, res) => {
  try {
    // const { slug } = req.params.pid;
    // const product = await productmodel.findOne

    const product = await productmodel.findById(req.params.pid).select("photo");
    // ({ slug });
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }

    if (!product.photo.data) {
      return res
        .status(400)
        .json({ success: false, message: "Photo not found" });
    }

    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
//delete products
export const deleteProductController = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await productmodel.findOneAndDelete({ slug });
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

//update product
export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping ||
      !photo
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // const  product = await productmodel.findById(req.params.pid);
    const productmodelcategory = await categorymodel.findOne({ name: "stand" });
    const productdetail = await productmodel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        category: productmodelcategory._id,
        slug: slugify(name),
        photo: {
          data: fs.readFileSync(photo.path),
          contentType: photo.type,
        },
      },
      { new: true }
    );
    if (!productdetail) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    const updatedProduct = await productdetail.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export default {
  createProductController,
  updateProductController,
  deleteProductController,
  getAllProductController,
  getSingleProductController,
  productPhotoController,
};
