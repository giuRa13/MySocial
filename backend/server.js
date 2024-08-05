/*npm install express jsonwebtoken bcryptjs dotenv mongoose cookie-parser*/
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import {v2 as cloudinary} from "cloudinary";
//import { toast } from "react-toastify";
//import { createRequire } from 'module';
//const require = createRequire(import.meta.url);
//const cors = require('cors');


dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// (built-in) Middleware
app.use(express.json()); // to parse JSON data in the req.body 
app.use(express.urlencoded({extended: true})) // even if the req.body has some nested obj, it will be able to parse without problem
app.use(cookieParser()); // allows to get the cookie from req and set the cookie in the response

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));


/////////////////////////////////////////////////////
/*app.use(cors(), function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

app.post("/upload-image", upload.single("image"), async (req, res) => {
    console.log(req.body);
    res.send("Uploaded");
    toast.success("Uploaded", {style: {background: "#33cc66", color: '#3c444c'}});
    res.end();
});*/