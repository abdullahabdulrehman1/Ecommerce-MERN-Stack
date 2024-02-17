import express from "express";
import { Router } from "express";

import { isAdmin, requireSignin } from "../middelwares/authMiddleware.js";
import {
  createCategoryController,
  updateCategoryController,
  getSingleCategoryController,
  getAllCategoryController,
  deleteCategoryController,
} from "../controller/categoryController.js";
// import { alreadyExistCategory } from "../middelwares/categoryMiddleware.js";
const router = express.Router();
router.post(
  "/create-category",
  requireSignin,
  isAdmin,

  createCategoryController,
  
);
//update category
router.put(
  "/update-category",
  requireSignin,
  isAdmin,
  updateCategoryController
);router.get("/getcategory",getAllCategoryController);

router.get(
  "/getsinglecategory/:slug",
  requireSignin,
  isAdmin,
  getSingleCategoryController
);
router.delete(
  "/deletecategory/:id",
  requireSignin,
  isAdmin,
  deleteCategoryController
);
export default router;
