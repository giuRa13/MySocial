import express from "express";
import protectRouteMiddleware from "../middlewares/protectRoute.js";
import { sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.post("/", protectRouteMiddleware ,sendMessage);

export default router;