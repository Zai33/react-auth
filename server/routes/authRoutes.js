import express from "express";
import {
  getMe,
  login,
  logout,
  register,
} from "../controller/authController.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/me", protectedRoute, getMe);

export default router;
