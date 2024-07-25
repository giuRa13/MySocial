import heartSVG from "../assets/heart.svg";
import heartClickedSVG from "../assets/heartClicked.svg";
import commentSVG from "../assets/comment.svg";
import refreshSVG from "../assets/refresh.svg";
import messageSVG from "../assets/message.svg";
import { useState } from "react";

const Actions = () => {
  
  const [liked, setLiked] = useState(false);

  return <>
    <div className="flex w-full" onClick={(e) => e.preventDefault()}>
        <div className="flex items-center gap-3 my-2">
        <button className={` ${liked ? 'clicked' : ''}`} onClick={() => setLiked(!liked)}>
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