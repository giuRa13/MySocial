import express from "express";
import { followUnFollowUser, getUserProfile, loginUser, logoutUser, signupUser, updateUser } from "../controllers/userController.js";
import protectRouteMiddleware from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/profile/:username", getUserProfile);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRouteMiddleware, followUnFollowUser);
router.post("/update/:id", protectRouteMiddleware ,updateUser)

export default router;