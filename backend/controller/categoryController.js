import categorymodel from "../models/categorymodel.js";
import slugify from "slugify";
// import mongoose from "mongoose";
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(200)
        .json({ success: false, messege: "Name is required" });
    }
    const existingCategory = await categorymodel.findOne({ name });
    if (existingCategory) {
      return res
        .status(200)
        .json({ success: false, message: "Category already exists" });
    }
    const category = new categorymodel({ name, slug: slugify(name) }); // Change here
    const savedCategory = await category.save();
    // res.json(savedCategory);
    console.log(savedCategory);
    res.status(200).json({
      success: true,
      message: "Category created successfully",
      category: savedCategory,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: "Category not created" });
    console.log("create categoryController error: " + err);
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name, id } = req.body;
    const existingCategory = await categorymodel.findOne({ _id: id });
    if (!existingCategory) {
      return res
        .status(200)
        .json({ success: false, message: "Previous category not found" });
    }

    const slug = slugify(name);

    const updatedCategory = await categorymodel.findOneAndUpdate(
      { _id: id },
      { name, slug },
      { new: true }
    );
    res.status(200).json({ success: true, message: updatedCategory });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
export const getAllCategoryController = async (req, res) => {
  try {
    const allCategory = await categorymodel.find({});
    res.status(200).json({ success: true, allCategory });
  } catch (err) {
    res.status(400).json({ success: false, messege: err.message });
  }
};
export const getSingleCategoryController = async (req, res) => {
  try {
    const { slug } = req.body;
    const allCategory = await categorymodel.findOne(slug);
    res.status(200).json({ success: true, allCategory });
  } catch (err) {
    res.status(400).json({ success: false, messege: err.message });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const allCategory = await categorymodel.findByIdAndDelete(id);
    if (!allCategory) {
      return res
        .status(400)
        .json({ success: false, message: "Category not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Successfully deleted", allCategory });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
export default {
  createCategoryController,
  deleteCategoryController,
  getSingleCategoryController,
  getAllCategoryController,
  updateCategoryController,
};
