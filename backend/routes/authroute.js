import { Router } from "express";
import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
} from "../controller/registerController.js";
import { testController } from "../middelwares/authMiddleware.js";
import { isAdmin, requireSignin } from "../middelwares/authMiddleware.js";
// import { decode } from "jsonwebtoken";

const router = express.Router();
router.post("/register", registerController);
router.post("/login", loginController);

router.get("/test", requireSignin, isAdmin, (req, res) => {
  res
    .status(200)
    .json({ message: "Test controller working fine  protected you are admin" });
});
//protected route
router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected route for a user",
    user: req.decoded,
  });
  // res.status(401).json({ok: false , message: "Protected not route for a user" });
});
router.get("/admin-auth", requireSignin, isAdmin, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.decoded,
    message: "Protected route for a user",
  });
  // } else res.status(44).json({ success: false });
});
router.post("/forgot-password", forgotPasswordController);
export default router;
