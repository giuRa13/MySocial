import User from "../models/userModel.js";
import Post from "../models/postModel.js";


const createPost = async (req, res) => {
    try {
        const {postedBy, text, img} = req.body;

        if(!postedBy || !text) return res.status(400).json({message: "PostedBy and text fields are required"});

        const user = await User.findById(postedBy);
        if(!user) return res.status(404).json({message: "User not found"});

        if(user._id.toString() !== req.user._id.toString())
            return res.status(401).json({message: "Unhautorized to create post"});

        const maxlength = 500;
        if(text.length > maxlength) return res.status(400).json({message: `Text must be less than ${maxlength} characters`});

        const newPost = new Post({postedBy, text, img});
        await newPost.save();
        res.status(201).json(newPost);
        
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in createdPost: ", error.message);
    }
};


const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) return res.status(404).json({message: "Post not found"});

        res.status(200).json({ post });

    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in getPost : ", error.message);
    }

}; 



const deletePost = async (req, res) => {
    try {
        const post =  await Post.findById(req.params.id); 
        
        if(!post) return res.status(404).json({message: "Post not found"});

        if(post.postedBy.toString() !== req.user._id.toString())
            return res.status(401).json({message: "Unauthorized to delete"});

        await Post.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "Post deleted successfully"});
        
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in deletePost: ", error.message);
    }
};



const likeUnlikePost = async (req, res) => {
    try {  
        const {id:postId} = req.params; 
        const userId = req.user._id;

        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({message: "Post not found"});

        const userLikedPost = post.likes.includes(userId);

        if(userLikedPost){
            // Unlike post
            await Post.updateOne({ _id: postId }, {$pull: { likes: userId }});
            res.status(200).json({message: "Post unliked successfully"});
        } else {
            post.likes.push(userId);
            await post.save();
            res.status(200).json({message: "Post liked successfully"});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in likeUnlikePost: ", error.message);
    }
};


export {createPost, getPost, deletePost, likeUnlikePost}