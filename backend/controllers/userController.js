import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";


const getUserProfile = async (req, res) => {
    const {username} = req.params;

    try {
        const user = await User.findOne({username}).select("-password").select("-createdAt");

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
    const { name, email, username, password, profilePic, bio} = req.body;
    const userId = req.user._id;
    try {
        let user = await User.findById(userId);
        if(!user) return res.status(400).json({error: "User not Found"});
        
        if(req.params.id !== userId.toString()) return res.status(400).json({error: "You cannot update other users profiles"});

        if(password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        // if a params changes we change it or we keep the old one
        user.name = name || user.name;
        user.email = email || user.email;
        user.username = username || user.username;
        user.profilePic = profilePic || user.profilePic;
        user.bio = bio || user.bio;

        user = await user.save();
        res.status(200).json({message: "Profile updated successfully", user});

    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error in updateUser: ", error.message);
    }
 };


export {signupUser, loginUser, logoutUser, followUnFollowUser, updateUser, getUserProfile};