import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authroute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productroutes.js";
import orderRoutes from "./routes/orderroute.js";
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

app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/auth", authRoutes);
app.use("/order",orderRoutes)

const HOST = process.env.HOST;

//run listen
app.listen(process.env.PORT, HOST, () => {
  console.log(
    `SERVER IS CONNECTED TO PORT  NEW ${process.env.PORT} ${HOST} and in ${process.env.DEV_ENV} environment`
      .bgGreen.white.italic.underline
  );
});
