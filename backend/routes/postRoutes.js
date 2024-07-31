import express from "express";
import { createPost, deletePost, getPost, likeUnlikePost } from "../controllers/postController.js";
import protectRouteMiddleware from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/:id", getPost);
router.post("/create", protectRouteMiddleware, createPost);
router.delete("/:id", protectRouteMiddleware, deletePost);
router.put("/like/:id", protectRouteMiddleware, likeUnlikePost);

export default router;