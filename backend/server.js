/*npm install express jsonwebtoken bcryptjs dotenv mongoose cookie-parser*/
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";


dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

// (built-in) Middleware
app.use(express.json()); // to parse JSON data in the req.body 
app.use(express.urlencoded({extended: true})) // even if the req.body has some nested obj, it will be able to parse without problem
app.use(cookieParser()); // allows to get the cookie from req and set the cookie in the response

// Routes
app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));