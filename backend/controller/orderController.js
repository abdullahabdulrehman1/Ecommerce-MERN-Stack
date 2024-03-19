import mongoose from "mongoose";
import express from "express";
import Stripe from "stripe";
import ordermodel from "../models/ordermodel.js";
import url from "../helpers/url.js";
import dotenv from "dotenv";
// import Order from "../../frontend/src/components/pages/user/order.jsx";

dotenv.config();
const privatekey = process.env.Stripe_Secret_Key;

const stripe = new Stripe(privatekey);


export const createOrderController = async (req, res) => {
  const { products, total, user } = req.body; // Assuming user details are in req.body

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
    
      line_items: products.map((product) => {
        return {
          price_data: {
            currency: "pkr",
            product_data: {
              name: product.name,
            },
            unit_amount: product.price*100,
          },
          quantity: product.salequantity,
        };
      }),
      success_url: `${url}/`,
      cancel_url: `${url}/cart`,
    });
    const retrievedPaymentIntent = await stripe.paymentIntents
    console.log(retrievedPaymentIntent);

console.log(user);
    // If session creation is successful, store order details in Order model
    const order = new ordermodel({
      user: String(user.id), // Assuming user._id is available
      email: user.email,
      name: user.name,
      products: products.map((product) => ({
        ...product,
        quantity: product.salequantity, // Add quantity field
      })),
      total: total,
      stripeSession: session.id, // Store Stripe session ID for reference
    });

    await order.save();

    res.status(200).json({ id: session.id,order:order });
  } catch (error) {
    // If session creation fails, respond with error message
    res.status(400).json({ message: 'Payment not completed' +error});
    console.log(error)
  }
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
    // throw new Error("Order not found");
  }
};
export const updateOrderToPaidController = async (req, res) => {
  const order = await ordermodel.findById(req.params._id);
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
    // throw new Error("Order not found");
  }
};
export const getMyOrdersController = async (req, res) => {
  const orders = await ordermodel.find({ user: req.user._id });
  res.json(orders);
};
export const getOrdersController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params)
    const orders = await ordermodel.findOne({ user: id })
      .populate("products", "-photo -products")
      .populate("user", "name");
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(400).json("Server Error");
  }
};
export default {
  createOrderController,
  getOrderByIdController,
  updateOrderToPaidController,
  getMyOrdersController,
  getOrdersController,
};
