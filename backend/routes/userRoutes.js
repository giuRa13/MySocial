import express from "express";
import { followUnFollowUser, getUserProfile, loginUser, logoutUser, signupUser, updateUser } from "../controllers/userController.js";
import protectRouteMiddleware from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/profile/:query", getUserProfile);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRouteMiddleware, followUnFollowUser);
router.put("/update/:id", protectRouteMiddleware ,updateUser)

export default router;