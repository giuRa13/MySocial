import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

const signupUser = async(req,res) => {
    try {
        const {name, email, username, password} = req.body;
        const user = await User.findOne({$or:[{email},{username}]});

        if (user) {
            return res.status(400).json({message:"User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            username,
            password:hashedPassword
        })
        await newUser.save();

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            res.status(201).json({
                _id: newUser._id, // ._id is autogen by mongoDb
                name: newUser.name,
                email: newUser.email,
                password: newUser.password,
                message:"User created successfully"
            });
        } else {
            res.status(400).json({message: "Invalid user data"});
        }
        
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in signupUser: ", error.message);
    }
};


const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || ""); // if user is invalid make it "", otherwise user will be null(error)
    
        if (!user || !isPasswordCorrect) return res.status(400).json({message: "Invalid Username or Password"});

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
        });
        console.log(`User "${user.username}" logged in successfully`);

    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in loginUser: ", error.message);
    }
};


const logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:1}); // clear the cookie after 1 millisecond
        res.status(200).json({message: "User Logged out successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in loginUser: ", error.message);
    }
};

export {signupUser, loginUser, logoutUser};