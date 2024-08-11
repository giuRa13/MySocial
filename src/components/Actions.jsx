import heartSVG from "../assets/heart.svg";
import heartClickedSVG from "../assets/heartClicked.svg";
import commentSVG from "../assets/comment.svg";
import refreshSVG from "../assets/refresh.svg";
import messageSVG from "../assets/message.svg";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";


const Actions = ({post:post_}) => {
  
  const user = useRecoilValue(userAtom);
  const [liked, setLiked] = useState(post_.likes.includes(user?._id));
  const [post, setPost] = useState(post_);
  const [isLiking, setIsLiking] = useState(false); // optimization

  const handleLikeUnlike = async() => {
    if(!user) toast.error("Must to logged in to like a post", {style: { background: "#d6436e", color: '#3c444c'}});
    if(isLiking) return;
    setIsLiking(true);
    try {
      const res = await fetch("/api/posts/like/" + post._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
      })
      const data = await res.json();
      if(data.error) {
        toast.error(data.error, {style: { background: "#d6436e", color: '#3c444c'}});
        return;
      }
      if(!liked){
        //add current user id to likes array
        setPost({...post, likes: [...post.likes, user._id]}) 
      } else {
        setPost({...post,likes: post.likes.filter(id => id !== user._id)});
      }
      setLiked(!liked);
      console.log(data);

    } catch (error) {
      toast.error(error, {style: { background: "#d6436e", color: '#3c444c'}});
    } finally {
      setIsLiking(false);
    }
  };

  return <>
    <div className="flex flex-row w-full justify-between items-center" onClick={(e) => e.preventDefault()}>
      <div className="flex w-full items-center gap-3 ml-2 text-grayM font-bold">
                <h2>{post.replies.length} Replies</h2>
                <div className="w-1 h-1 bg-grayM rounded-full"></div>
                <h2>{post.likes.length} Likes</h2>
            </div>
        <div className="flex justify-end w-full items-center gap-5 mr-2">
          <button className={` ${liked ? 'clicked' : ''}`} onClick={handleLikeUnlike}>
              {liked ? <img className="w-[2.5rem]" src={heartClickedSVG} alt="likeNo" /> 
              : <img className="w-[2.5rem]" src={heartSVG} alt="likeYes" />}
          </button>
          <img  src={commentSVG} alt="comment"/>
          <img  src={refreshSVG} alt="reload"/>
          <img  src={messageSVG} alt="message"/>
        </div>
    </div> 
  </>
}

export default Actions