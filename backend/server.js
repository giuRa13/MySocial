/*npm install express jsonwebtoken bcryptjs dotenv mongoose cookie-parser*/
import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import {v2 as cloudinary} from "cloudinary";
import {app, server} from "./socket/socket.js";

dotenv.config();

connectDB();

//const app = express(); //NOW app IS IN socket.js FILE   

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// (built-in) Middleware
app.use(express.json({limit:"50mb"})); // to parse JSON data in the req.body 
app.use(express.urlencoded({extended: true})) // even if the req.body has some nested obj, it will be able to parse without problem
app.use(cookieParser()); // allows to get the cookie from req and set the cookie in the response

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);


// backend, frontend on same url(localhost:5000) //npm install -g win-node-env
if(process.env.NODE_ENV === "production") {
  //static assets
  app.use(express.static(path.join(__dirname, "/frontend/dist")))

  //react app
  app.get("*", (req,res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  })
}


server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
// change APP to SERVER only here and now can handle both Http requests and Socket.io related things


