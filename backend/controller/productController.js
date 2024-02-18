import productmodel from "../models/productmodel.js";
import fs from "fs";
import slugify from "slugify";
import categorymodel from "../models/categorymodel.js";
export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }

    if (!description) {
      return res
        .status(400)
        .json({ success: false, message: "Description is required" });
    }

    if (!price) {
      return res
        .status(400)
        .json({ success: false, message: "Price is required" });
    }

    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "Category is required" });
    }

    if (!quantity) {
      return res
        .status(400)
        .json({ success: false, message: "Quantity is required" });
    }

    if (!shipping) {
      return res
        .status(400)
        .json({ success: false, message: "Shipping is required" });
    }

    if (!photo) {
      return res
        .status(400)
        .json({ success: false, message: "Photo is required" });
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
      .limit()
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
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }

    if (!description) {
      return res
        .status(400)
        .json({ success: false, message: "Description is required" });
    }

    if (!price) {
      return res
        .status(400)
        .json({ success: false, message: "Price is required" });
    }

    if (!quantity) {
      return res
        .status(400)
        .json({ success: false, message: "Quantity is required" });
    }

    // const  product = await productmodel.findById(req.params.pid);
    const productmodelcategory = await categorymodel.findOne({
      name: slugify(category),
    });
    const productdetail = await productmodel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        category: productmodelcategory._id,
        slug: slugify(name),
        ...(photo
          ? {
              photo: {
                data: fs.readFileSync(photo.path),
                contentType: photo.type,
              },
            }
          : {
              photo: photo, // Use previous photo if new photo is not provided
            }),
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
export const productFilterController = async (req, res) => {
  try {
    let { checked, radio } = req.body;
console.log("radio:", radio);
console.log("checked:", checked);
let args = {};
if (checked.length > 0) {
  args.category = checked;
}

if (radio) {
  // radio = radio[0].split(',').map(Number); // convert radio to an array of numbers
  args.price = {
    $gte: radio[0],
    $lte: radio[1],
  };
}

console.log("args:", args);

const products = await productmodel
  .find(args)
  .populate("category")
  .select("-photo")
  .sort({ createdAt: -1 });
console.log("products:", products);


  res.status(200).json({ success: true, products: products });

  } catch (err) {
    console.log("error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
export const productSearchController = async (req, res) => {
  try {
    const { query } = req.params;
    if (!query) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a search query" });
    }
    const products = await productmodel.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    }).select("-photo").populate("category");
    if (!products) {
      return res
        .status(200)
        .json({ success: true, message: "No products found", products: []});
    }
    res.status(200).json({ success: true, products });
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
  productFilterController,
  productSearchController
};
