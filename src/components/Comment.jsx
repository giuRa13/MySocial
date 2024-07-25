import avatarSVG from "../assets/avatar.svg";
import threeDotsSVG from "../assets/threeDots.svg";
import Actions from "./Actions";

const Comment = ({comment, createdAt, likes, replies, username}) => {

  return (
    <>
    <div className="flex gap-4 py-2 my-2 w-full">

        <img src={avatarSVG} alt="user avatar" className="flex w-12 h-12 rounded-full border-2 border-greenM1 p-1"/>
        
        <div className="w-full gap-1 flex flex-col">
            <div className="flex justify-between items-center w-full">
                <h3 className="text-md font-bold">{username}</h3>
                <div className="flex gap-4 items-center">
                    <h3 className="text-md font-bold text-grayM">{createdAt}</h3>
                    <img src={threeDotsSVG} alt="three"/>
                </div>
            </div>
            <p>{comment}</p>
            <Actions/>
            <div className="flex items-center gap-3 ml-2 text-grayM font-semibold">
                <h2>{likes} Likes</h2>
                <div className="w-1 h-1 bg-grayM rounded-full"></div>
                <h2>{replies} Replies</h2>
            </div>          
   
        </div>
    </div>
    <hr className="my-4 border-greenM1"/>
    </>
  )
}

export default Comment