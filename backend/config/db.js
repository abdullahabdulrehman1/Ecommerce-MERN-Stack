import mongoose from "mongoose";
import Color from "colors";
// const Color = require('colors')
// const mongoose = require('mongoose')
const connectDB = async () => {
  const PORT = process.env.PORT;
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Congragulations MongoDB is connected to ${conn.connection.host}`.bgGreen
        .white.underline.italic
    );
  } catch (error) {
    console.log(`Unable to Connect MongoDB ${error} error`.bgRed.italic);
    // console.log(process.env.MONGO_URL)
    // process.exit(1);
  }
};
export default connectDB;
  