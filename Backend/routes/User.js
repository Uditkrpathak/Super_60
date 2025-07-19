import express from "express";
import { loginUser, loginWithGoogle, registerUser } from "../controllers/User.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/google-login",loginWithGoogle);
router.post("/register", registerUser);

export default router;
