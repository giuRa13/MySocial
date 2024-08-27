import express from "express";
import protectRouteMiddleware from "../middlewares/protectRoute.js";
import { getConversations, getMessages, sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.get("/conversations", protectRouteMiddleware, getConversations);
router.get("/:otherUserId", protectRouteMiddleware, getMessages);
router.post("/", protectRouteMiddleware ,sendMessage);



export default router;