import express from "express";
import { createPost, deletePost, getPost } from "../controllers/postController.js";
import protectRouteMiddleware from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/:id", getPost);
router.post("/create", protectRouteMiddleware, createPost);
router.delete("/:id",protectRouteMiddleware ,deletePost)

export default router;