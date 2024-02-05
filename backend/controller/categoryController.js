import categorymodel from "../models/categorymodel.js";
import slugify from "slugify";
// import mongoose from "mongoose";
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).send("Name is required");
    const existingCategory = await categorymodel.findOne({ name });
    if (existingCategory)
      return res
        .status(400)
        .json({ success: false, message: "Category already exists" });
    const category = new categorymodel({ name, slug: slugify(name) }); // Change here
    const savedCategory = await category.save();
    // res.json(savedCategory);
    console.log(savedCategory);
    res.status(201).json({
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
    const { name, prevname } = req.body;
    const existingCategory = await categorymodel.findOne({ name: prevname });
    if (!existingCategory) {
      return res
        .status(400)
        .json({ success: false, message: "Previous category not found" });
    }
    if (prevname !== name) {
      const slug = slugify(name);
      const updatedCategory = await categorymodel.findOneAndUpdate(
        { name: prevname },
        { name, slug },
        { new: true }
      );
      console.log(updatedCategory);
      res.status(200).json({ success: true, message: updatedCategory });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Name is same as previous" });
    }
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
    const { name } = req.body;
    const allCategory = await categorymodel.findOne({ name: name });
    res.status(200).json({ success: true, allCategory });
  } catch (err) {
    res.status(400).json({ success: false, messege: err.message });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const allCategory = await categorymodel.findOneAndDelete({ name: name });
    res
      .status(200)
      .json({ success: true, messege: "success fully deleted", allCategory });
  } catch (err) {
    res.status(400).json({ success: false, messege: err.message });
  }
};

export default {
  createCategoryController,
  deleteCategoryController,
  getSingleCategoryController,
  getAllCategoryController,
  updateCategoryController,
};
