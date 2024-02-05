import productmodel from "../models/productmodel.js";
import fs from "fs";
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
    const product = new productmodel({
     ...req.fields,
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
    res.status(400).json({ success: false, message: err.message });
  }
};
