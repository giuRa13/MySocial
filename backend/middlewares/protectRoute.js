import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// need this because is needed the user(need to be logged in) that will follow/unfollow  

const protectRouteMiddleware = async (req , res, next) => {
    try {
        const token = req.cookies.jwt;

        if(!token) return res.status(401).json({message: "Unauthorized"});

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");

        req.user = user; // (new field created now for this call)

        next();

    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in protectRouteMiddleware: ", error.message);
    }
};

export default protectRouteMiddleware;