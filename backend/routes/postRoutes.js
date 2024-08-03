import express from "express";
import { createPost, deletePost, getFeedPost, getPost, likeUnlikePost, replyToPost } from "../controllers/postController.js";
import protectRouteMiddleware from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/feed", protectRouteMiddleware, getFeedPost);
router.get("/:id", getPost);
router.post("/create", protectRouteMiddleware, createPost);
router.delete("/:id", protectRouteMiddleware, deletePost);
router.put("/like/:id", protectRouteMiddleware, likeUnlikePost);
router.post("/reply/:id", protectRouteMiddleware, replyToPost);


export default router;