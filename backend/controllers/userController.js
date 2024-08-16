import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import {v2 as cloudinary} from "cloudinary";
import mongoose from "mongoose";
import Post from "../models/postModel.js";



const getUserProfile = async (req, res) => {
    const {query} = req.params;

    try {
        let user;
        if (mongoose.Types.ObjectId.isValid(query)){
            user = await User.findOne({_id: query}).select("-password");
        } else {
            // "query" is "username"
            user = await User.findOne({username: query}).select("-password");
        }

        if(!user) return res.status(404).json({error: "User not found"});

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error in getUserProfile: ", error.message);
    }
 };



const signupUser = async(req,res) => {
    try {
        const {name, email, username, password} = req.body;
        const user = await User.findOne({$or:[{email},{username}]});

        if (user) {
            return res.status(400).json({error:"User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            username,
            password:hashedPassword,
        });
        await newUser.save();

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            res.status(201).json({
                _id: newUser._id, // ._id is autogen by mongoDb
                name: newUser.name,
                email: newUser.email,
                username: newUser.username,
                bio: newUser.bio,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({error: "Invalid user data"});
        }
        
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error in signupUser: ", error.message);
    }
};



const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || ""); // if user is invalid make it "", otherwise user will be null(error)
    
        if (!user || !isPasswordCorrect) return res.status(400).json({error: "Invalid Username or Password"});

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            bio: user.bio,
            profilePic: user.profilePic,
        });
        console.log(`User "${user.username}" logged in successfully`);

    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error in loginUser: ", error.message);
    }
};



const logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:1}); // clear the cookie after 1 millisecond
        res.status(200).json({message: "User Logged out successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error in loginUser: ", error.message);
    }
};



const followUnFollowUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id); // (the object created with the "protectRouteMiddleware")
    
        if(id === req.user._id.toString()) return res.status(400).json({error: "Can not follow/unfollow yourself!"});
    
        if(!userToModify || !currentUser) return res.status(400).json({error: "User not found"});
    
        const isFollowing = currentUser.following.includes(id);
    
        if(isFollowing) {
            // Unfollow user
            await User.findByIdAndUpdate(req.user._id, {$pull: {following: id}});
            await User.findByIdAndUpdate(id, {$pull: {followers: req.user._id}});
            res.status(200).json({message: "User unfollowed successfully"});
        } else {
            // Follow user
            await User.findByIdAndUpdate(req.user._id, {$push: {following: id}});
            await User.findByIdAndUpdate(id, {$push: {followers: req.user._id}});
            res.status(200).json({message: `Start to follow User: ${id} successfully`});
        }

    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error in followUnfollowUser: ", error.message);
    }

};



 const updateUser = async (req, res) => {
    const { name, email, username, password, bio} = req.body;
    let {profilePic} = req.body;
    const userId = req.user._id;
    try {
        let user = await User.findById(userId);
        if(!user) return res.status(404).json({error: "User not Found"});
        
        if(req.params.id !== userId.toString()) return res.status(400).json({error: "You cannot update other users profiles"});

        if(password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        if (profilePic) {
            if (user.profilePic){ //(delete the old one)
                await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
            }
            const uploadedResponse = await cloudinary.uploader.upload(profilePic);
            profilePic = uploadedResponse.secure_url;
        }

        // if a params changes we change it or we keep the old one
        user.name = name || user.name;
        user.email = email || user.email;
        user.username = username || user.username;
        user.profilePic = profilePic || user.profilePic;
        user.bio = bio || user.bio;

        user = await user.save();

        // solve problem when updating User couse in replies there is "userProfilePic" not "profilePic"...
        // (find all posts that user replied and update "username" and "userProfilePic" fields)
        await Post.updateMany( 
            {"replies.userId":userId},
            {
                $set:{
                    "replies.$[reply].username":user.username,
                    "replies.$[reply].userProfilePic":user.profilePic,
                }
            },
            {arrayFilters:[{"reply.userId":userId}]}
        );
        
        user.password = null; // so not showing the password in the response
        res.status(200).json({user});

    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error in updateUser: ", error.message);
    }
 };


export {signupUser, loginUser, logoutUser, followUnFollowUser, updateUser, getUserProfile};