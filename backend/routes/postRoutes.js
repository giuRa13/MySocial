import express from "express";
import { createPost, deletePost, getFeedPost, getPost, getUserPosts, likeUnlikePost, replyToPost } from "../controllers/postController.js";
import protectRouteMiddleware from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/feed", protectRouteMiddleware, getFeedPost);
router.get("/:id", getPost);
router.get("/user/:username", getUserPosts);
router.post("/create", protectRouteMiddleware, createPost);
router.delete("/:id", protectRouteMiddleware, deletePost);
router.put("/like/:id", protectRouteMiddleware, likeUnlikePost);
router.put("/reply/:id", protectRouteMiddleware, replyToPost);


export default router;