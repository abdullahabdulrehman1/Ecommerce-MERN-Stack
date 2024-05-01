import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import {
  createOrderController,
  getOrderByIdController,
  updateOrderToPaidController,
  getMyOrdersController,
  getOrdersController,
  getAdminOrders,
} from  "../controller/orderController.js";
import { isAdmin, requireSignin } from "../middelwares/authMiddleware.js";
const router = express.Router();
router.post("/createorder", requireSignin, createOrderController);
router.get("/getorder/:id", requireSignin, getOrdersController);
router.get("/getmyorderstatus/:id", requireSignin, updateOrderToPaidController);
router.get("/getadminorders", requireSignin, isAdmin, getAdminOrders);

export default router;

