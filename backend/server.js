import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authroute.js";
import router from "./routes/authroute.js";
import { testController } from "./middelwares/authMiddleware.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productroutes.js";
import { getAllCategoryController, getSingleCategoryController } from "./controller/categoryController.js";
dotenv.config();
const app = express();
connectDB();
// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
// app.use("")

//rest api
app.get("/", (req, res) => {
  res.send("<h1>  Connected to server</h1>");
});

//for got password 
app.use("/category", categoryRoutes);
app.use("/product",productRoutes);
app.post("/register", authRoutes);
app.post("/login", authRoutes);
app.post("/forgot-password", authRoutes);
app.get("/test", authRoutes);
app.get("/user-auth", authRoutes);
app.get("/admin-auth", authRoutes);

//port
const PORT = process.env.PORT ;
const HOST = process.env.HOST;
const dev = process.env.DEV_ENV;

//run listen
app.listen(PORT,HOST, () => {
  console.log(
    `SERVER IS CONNECTED TO PORT  NEW ${PORT} ${HOST} and in ${dev} environment`.bgGreen
      .white.italic.underline
  );
});