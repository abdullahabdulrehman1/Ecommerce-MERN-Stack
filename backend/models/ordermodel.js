import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Assuming you have a User model
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  products: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    salequantity: { type: Number, required: true },
    quantity: { type: Number, required: true },
    // Include other product fields here
  }],
  total: {
    type: Number,
    required: true,
  },
  stripeSession: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

export default mongoose.model ("Order", orderSchema);
// status: {
//     type: String,
//     default: "Not processed",
//     enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"],
// },  