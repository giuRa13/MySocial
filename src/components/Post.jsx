import { Link } from "react-router-dom";
import avatarSVG from "../assets/avatar.svg";
import verifiedSVG from "../assets/verified.svg";
import Actions from "./Actions";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";
import deleteSVG from "../assets/delete.svg";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";



const Post = ({post, postedBy}) => {

    const [user, setUser] = useState(null);
    const currentUser = useRecoilValue(userAtom);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch("/api/users/profile/" + postedBy);
                const data = await res.json();
                //console.log(data);
                if(data.error) {
                    toast.error(data.error, {style: { background: "#d6436e", color: '#3c444c'}});
                    return;
                }
                setUser(data);

            } catch (error) {
                toast.error(error, {style: { background: "#d6436e", color: '#3c444c'}})
                setUser(null);
            }
        }
        getUser();
    }, [postedBy]);

    const handleDeletePost = async (e) => {
        try {
            e.preventDefault();  //avoid Link to...
            if(!window.confirm("Are you sure to delete this post?")) return;

            const res = await fetch(`/api/posts/${post._id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if(data.error) {
                toast.error(data.error, {style: { background: "#d6436e", color: '#3c444c'}});
                return;
            }
            toast.success("Post deleted successfully", {style: { background: "#25da72", color: '#3c444c'}});

        } catch (error) {
            toast.error(error, {style: { background: "#d6436e", color: '#3c444c'}})
        }
    };


    return (
    <Link to={`/${user?.username}`}>{/*`/${user?.username}/post/${post._id}` */}
        <div className="flex gap-6 w-full my-[5rem] border border-greenM1 rounded-lg p-4">

        <div className="flex flex-col justify-between items-center">
            <Link to={`/${user?.username}`}>
            <div className="inline-block items-center w-20 h-20 min-w-20 min-h-20 rounded-full border-2 border-greenM1">
                <img src={user?.profilePic || avatarSVG} alt="user avatar" className="rounded-full w-[100%] h-[100%]"/>
            </div> 
            </Link>     
            <div className="relative w-[1px] h-full mt-4 mb-10 bg-greenM1"></div>
            <div className="relative w-full">
                {post.replies.length === 0 && <h3 className="flex justify-center items-center mb-8 text-xl">😴</h3>}
                {post.replies[1] && (
                    <div className="w-8 h-8 rounded-full border-2 border-greenM1 absolute bottom-8 left-2">
                        <img src={post.replies[1].userProfilePic || avatarSVG} alt="user avatar" className="rounded-full w-[100%] h-[100%]"/>
                    </div>  
                )}
                {post.replies[2] && (
                    <div className="w-8 h-8 min-w-8 min-h-8 rounded-full border-2 border-greenM1 absolute bottom-8 left-10">
                        <img src={post.replies[2].userProfilePic || avatarSVG} alt="user avatar" className="rounded-full w-[100%] h-[100%]"/>
                    </div>  
                )}
                {post.replies[post.replies.length -1] && (
                <div className="w-8 h-8 min-w-8 min-h-8 rounded-full border-2 border-greenM1 absolute bottom-0 left-6">
                    <img src={post.replies[0].userProfilePic ||avatarSVG} alt="user avatar" className="rounded-full w-[100%] h-[100%]"/>
                </div>  
                )}
            </div>
        </div>

        <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between w-full">
                <div className="flex flex-row items-center">
                    <Link to={`/${user?.username}`} className="flex items-center">
                    <h3 className="text-md font-bold">{user?.name}</h3>
                    <img src={verifiedSVG} alt="verified"className="ml-2"/>
                    </Link>
                </div>
                <div className="flex gap-4 items-center">
                    <h3 className="font-bold text-grayM mr-2"> {formatDistanceToNow(new Date(post.createdAt))} ago</h3>
                    {currentUser?._id === user?._id && (
                        <button onClick={handleDeletePost}>
                            <img src={deleteSVG} alt="trash" />
                        </button>
                    )}
                </div>
            </div>
            <h3 className="text-md mb-2">{post.text}</h3>
            {post.img &&(
                <div className="border border-greenM1 rounded  overflow-hidden">
                    <img className="w-full" src={post.img}/>
                </div>
            )}

            <div className="flex w-full items-center mt-16 mb-6">          
                <Actions post={post}/>
            </div>
            
        </div>
        
        </div>
    </Link>
  )
}

export default Post