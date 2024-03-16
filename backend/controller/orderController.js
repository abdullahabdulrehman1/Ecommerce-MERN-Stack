import mongoose from "mongoose";
import express from "express";
import Stripe from "stripe";
import ordermodel from "../models/ordermodel.js";
import url from "../helpers/url.js";
import dotenv from "dotenv";

dotenv.config();
const privatekey = process.env.Stripe_Secret_Key;

const stripe = new Stripe(privatekey);

export const createOrderController = async (req, res) => {
  const { products, total } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment", // Add this line
    line_items: products.map((product) => {
      return {
        price_data: {
          currency: "pkr",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price,
        },
        quantity: product.salequantity,
      };
    }),
    success_url: `${url}/`,
    cancel_url: `${url}/cart`,
  });
  res.status(200).json({ id: session.id });
};

export const getOrderByIdController = async (req, res) => {
  const order = await ordermodel.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
};
export const updateOrderToPaidController = async (req, res) => {
  const order = await ordermodel.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
};
export const getMyOrdersController = async (req, res) => {
  const orders = await ordermodel.find({ user: req.user._id });
  res.json(orders);
};
export const getOrdersController = async (req, res) => {
  const orders = await ordermodel.find({}).populate("user", "id name");
  res.json(orders);
};

export default {
  createOrderController,
  getOrderByIdController,
  updateOrderToPaidController,
  getMyOrdersController,
  getOrdersController,
};
