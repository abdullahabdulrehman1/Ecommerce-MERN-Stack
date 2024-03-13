import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    buyer: {
        type: mongoose.ObjectId,
        ref: "User",
    },
  
    payment : {
       
    },

    status: {
        type: String,
        default: "Not processed",
        enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"],
    },  

}, { timestamps: true });
export default mongoose.model ("Order", orderSchema);