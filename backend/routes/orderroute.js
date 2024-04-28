import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
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
router.post('/webhook', express.json({type: 'application/json'}), async (request, response) => {
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(request.body, request.headers['stripe-signature'], whsec_oNVVSEMchdBxOKu4qLEXBR6NFQKtKojl);
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Retrieve the Stripe session
    const stripeSession = await stripe.checkout.sessions.retrieve(session.id);

    // Call updateOrderToPaidController with the Stripe session
    await updateOrderToPaidController(stripeSession);
  }

  response.status(200).send();
});
export default router;
