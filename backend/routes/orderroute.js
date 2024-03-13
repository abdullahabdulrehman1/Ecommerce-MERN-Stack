
import mongoose from "mongoose";
import express from "express";
import { createOrderController, getOrderByIdController, updateOrderToPaidController, getMyOrdersController, getOrdersController } from "../controller/orderController.js";
import { requireSignin } from "../middelwares/authMiddleware.js";
const router = express.Router();
router.post("/createorder", requireSignin,createOrderController);


export default router;

