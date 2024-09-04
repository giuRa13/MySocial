import heartSVG from "../assets/heart.svg";
import heartClickedSVG from "../assets/heartClicked.svg";
import commentSVG from "../assets/comment.svg";
import refreshSVG from "../assets/refresh.svg";
import messageSVG from "../assets/message.svg";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import Modal from "./Modal.jsx";
import postsAtom from "../atoms/postsAtom.js";


const Actions = ({post}) => {
  
  const user = useRecoilValue(userAtom);
  const [liked, setLiked] = useState(post.likes.includes(user?._id));
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [isLiking, setIsLiking] = useState(false); // optimization
  const [isReplying, setIsReplying] = useState(false);

  const [open, setOpen] = useState(false);
  const [replyText, setReplyText] = useState("");


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
        const updatedPosts = posts.map((p) => {
          if (p._id === post._id) {
            return {...p, likes: [...p.likes, user._id]};
          }
          return p;
        })
        setPosts(updatedPosts);
      } else {
        const updatedPosts = posts.map((p) => {
          if (p._id === post._id) {
            return {...p, likes: p.likes.filter((id) => id !== user._id)};
          }
          return p;
        })
        setPosts(updatedPosts);
      }
      setLiked(!liked);
      console.log(data);

    } catch (error) {
      toast.error(error, {style: { background: "#d6436e", color: '#3c444c'}});
    } finally {
      setIsLiking(false);
    }
  };


  const handleReply = async() => {
    if(!user) return toast.error("Must be logged in to reply...", {style: { background: "#d6436e", color: '#3c444c'}});
    if(isReplying) return;
    setIsReplying(true);
    try {
      const res = await fetch("/api/posts/reply/" + post._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({text:replyText})
      })
      const data = await res.json();
      console.log(data)
      if(data.error) {
        toast.error(data.error, {style: { background: "#d6436e", color: '#3c444c'}});
      }
      const updatedPosts = posts.map((p) => {
        if (p._id === post._id) {
          return {...p, replies: [...p.replies, data]};
        }
        return p;
      })
      setPosts(updatedPosts);
      toast.success("Reply posted successfully",{style: { background: "#25da72", color: '#3c444c'}});
      setReplyText("");
      setOpen(false);
      
    } catch (error) {
      toast.error(error, {style: { background: "#d6436e", color: '#3c444c'}})
    } finally {
      setIsReplying(false);
    }
  };

  
  return <>
    <div className="flex flex-row w-full justify-between items-center" id="action-responsive"
    onClick={(e) => e.preventDefault()} >
      <div className="flex w-full items-center gap-3 ml-2 text-grayM font-bold">
                <h2>{post.replies.length} Replies</h2>
                <div className="w-1 h-1 bg-grayM rounded-full"></div>
                <h2>{post.likes.length} Likes</h2>
            </div>

        <div className="flex justify-end w-full items-center mr-2 gap-5" id="action-responsive2">
          <button  onClick={handleLikeUnlike}>
              {liked ? <img className="w-[2.5rem] min-w-[1.5rem]" src={heartClickedSVG} alt="likeNo" id="action-responsive3" /> 
              : <img className="w-[2.5rem] min-w-[1.5rem]" src={heartSVG} alt="likeYes" id="action-responsive3"/>}
          </button>
          <img  src={commentSVG} alt="comment" id="action-responsive3" onClick={() => setOpen(true)}/>
          <Repost />
          <Share />
        </div>
    </div> 

    <Modal open={open} onClose={() =>setOpen(false)} >
    <div className="w-full h-full p-8" onClick={(e) => e.preventDefault()}>
        <form onSubmit={handleReply}>
        <div className="flex flex-col w-full">
          <div className="w-full my-4">
            <h3 className="text-xl mr-auto p-2 font-bold text-greenM1">New Reply</h3>
            <textarea className="w-full p-2 bg-transparent rounded outline-none mt-4 min-h-[150px] border border-greenM1 myText" 
            value={replyText} onChange={((e) => setReplyText(e.target.value))} placeholder="Reply..." >
            </textarea>
          </div>
  
          <div className="flex ml-auto mt-8 gap-4" id="modal-buttons">
            <button type="submit"  className="bg-greenM1 text-grayM font-bold py-2 px-6 rounded hover:opacity-70"
            onClick={handleReply}> 
              Post
            </button>
            <button type="button" className="bg-red text-grayM font-bold py-2 px-6 rounded hover:opacity-70"
            onClick={() => setOpen(false)}>
                Cancel
            </button>
          </div>
        </div>
        {/*avoid bug button*/}
        <button type="button" className="absolute top-2 right-2 py-2 px-4 rounded-lg font-bold bg-red hover:opacity-70 "
        onClick={()=>setOpen(false)}>
            X
        </button>
        </form>   
        </div> 
      </Modal>
   
  </>
}

export default Actions;



  


const Repost = () =>  {
  return(
    <img  src={refreshSVG} alt="repost" id="action-responsive3"/>
  )
};

const Share = () =>  {
  return(
    <img  src={messageSVG} alt="share" id="action-responsive3"/>
  )
};