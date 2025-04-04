import express from "express";
import authController from "../controllers/auth.controller";
const router = express.Router();
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

export { router as AuthRouter };
