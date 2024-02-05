import mongoose from "mongoose";
import slugify from "slugify";
import express from "express";

import formidable from "express-formidable";
import { isAdmin, requireSignin } from "../middelwares/authMiddleware.js";
import { createProductController } from "../controller/productController.js";

const router = express.Router();

router.post("create-product", requireSignin, isAdmin,formidable(), createProductController);

export default router;
