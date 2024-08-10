import { Link } from "react-router-dom";
import avatarSVG from "../assets/avatar.svg";
import verifiedSVG from "../assets/verified.svg";
import threeDotsSVG from "../assets/threeDots.svg";
import Actions from "./Actions";
// JUST DESIGN
const UserPost = ({postImg, likes, replies, postTitle}) => {

  return (
    <Link to={"/username/post/1"}>
        <div className="flex gap-4 w-full pt-5 my-6">

        <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border-2 border-greenM1 p-1">
                <img src={avatarSVG} alt="user avatar"/>
            </div>      
            <div className="w-[1px] h-full bg-greenM1 mt-2 mb-14"></div>
            <div className="relative w-full">
                <div className="w-8 rounded-full border-2 border-greenM1 p-0.5 absolute -top-12">
                    <img src={avatarSVG} alt="user avatar"/>
                </div>    
                <div className="w-8 rounded-full border-2 border-greenM1 p-0.5 absolute -top-12 left-8">
                    <img src={avatarSVG} alt="user avatar"/>
                </div>  
                <div className="w-8 rounded-full border-2 border-greenM1 p-0.5 absolute -top-5 left-4">
                    <img src={avatarSVG} alt="user avatar"/>
                </div>  
            </div>
        </div>

        <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between w-full">
                <div className="flex items-center">
                    <h3 className="text-md font-bold">Full Username</h3>
                    <img src={verifiedSVG} alt="verified" />
                </div>
                <div className="flex gap-4 items-center">
                    <h3 className="text-md font-bold text-grayM">1D</h3>
                    <img src={threeDotsSVG} alt="three"/>
                </div>
            </div>
            <h3 className="text-md mb-2">{postTitle}</h3>
            {postImg &&(
                <div className="border border-greenM1 rounded  overflow-hidden">
                <img className="w-full" src={postImg}/>
            </div>)}

            <Actions/>
            <div className="flex items-center gap-3 mt-2 ml-2 text-grayM font-semibold">
                <h2>{likes} Likes</h2>
                <div className="w-1 h-1 bg-grayM rounded-full"></div>
                <h2>{replies} Replies</h2>
            </div>
            
        </div>
        
        </div>
    </Link>
  )
}

export default UserPost