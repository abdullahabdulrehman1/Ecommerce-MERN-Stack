import axios from "axios";
import usermodel from "../models/usermodel.js";
import JWT from "jsonwebtoken";
import mongoose from "mongoose";

export const requireSignin = async (req, res, next) => {
  try {
    const token = await req.headers.authorization;
    const date = new Date();
    console.log("token", token);
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token provided" });
    }
    await JWT.verify(token, process.env.JSON_WEB, function (err, decoded) {
      if (err) {
        console.log(
          `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        );

        res
          .status(401)
          .json({ success: false, message: "Unauthorized: Invalid token" });
        console.log(err);
      } else {
        console.log("Token verifified successfully");
        console.log(
          `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        );

        req.decoded = decoded;

        console.log(decoded.role);

        next();
      }
    });
  } catch (error) {
    console.log(`Error: JWT here ERROR ${error.message}`);
    res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
};
export const isAdmin = async (req, res, next) => {
  try {
    const user = await usermodel.findById(req?.decoded.id);
    console.log(user);
    if (user.role !== "1") {
      return res.status(401).send({
        success: false,
        message: "Un-authorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
};
export const testController = async (req, res) => {
  console.log(`test controller ${res.user}`);
  res
    .status(200)
    .json({ message: "Test controller working fine  protected you are admin" });
};

export default { requireSignin, isAdmin, testController };
