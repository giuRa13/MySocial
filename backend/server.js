/*npm install express jsonwebtoken bcryptjs dotenv mongoose cookie-parser*/
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));