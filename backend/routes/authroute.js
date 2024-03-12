import { Router } from "express";
import express from "express";
import {
  registerController,
  loginController,
  allUsersController,
  deleteUserController,
  forgotPasswordController,
  UpdateUserController,
  fetchUserControler,
} from "../controller/registerController.js";
import { testController } from "../middelwares/authMiddleware.js";
import { isAdmin, requireSignin } from "../middelwares/authMiddleware.js";

const router = express.Router();
router.post("/register", registerController);
router.post("/login", loginController);

router.get("/test", requireSignin, isAdmin, (req, res) => {
  res
    .status(200)
    .json({ message: "Test controller working fine  protected you are admin" });
});
router.put("/update-user/:id", requireSignin, UpdateUserController);
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
router.get("/fetch-user/:id", requireSignin, fetchUserControler);
router.get("/all-users", requireSignin, isAdmin, allUsersController);
router.delete("/delete-user/:id",requireSignin,isAdmin,deleteUserController);

export default router;
