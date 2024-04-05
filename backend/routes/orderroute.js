import mongoose from "mongoose";
import express from "express";
import {
  createOrderController,
  getOrderByIdController,
  updateOrderToPaidController,
  getMyOrdersController,
  getOrdersController,
} from "../controller/orderController.js";
import { requireSignin } from "../middelwares/authMiddleware.js";
const router = express.Router();
router.post("/createorder", requireSignin, createOrderController);
router.get("/getorder/:id", requireSignin, getOrdersController);
router.get("/getmyorderstatus/:id", requireSignin, updateOrderToPaidController);

export default router;
