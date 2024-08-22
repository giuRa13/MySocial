import { Link } from "react-router-dom"
import avatarSVG from "../assets/avatar.svg"
import useFollowUnfollow from "../hooks/useFollowUnfollow"

const SuggestedUser = ({user}) => {

    const {handleFollowUnfollow, following} = useFollowUnfollow(user);

  return (
    
    <div className="flex flex-row w-full rounded-lg px-4 py-2 mb-4 hover:opacity-70 border border-greenM1" id="users">
            {/*<div className="w-12 rounded-full border-4 border-greenM1">
            <img src={avatarSVG} />
            </div>*/}
         <Link to={`${user.username}`}>
        { user.profilePic && (
            <div className="inline-block items-center w-12 h-12 min-w-12 min-h-12 rounded-full border-4 border-greenM1">
            <img src={user.profilePic} alt="avatar" className="rounded-full w-[100%] h-[100%] "/>
            </div>
        )}
        { !user.profilePic &&(
            <div className="inline-block items-center w-12 h-12 min-w-12 min-h-12 rounded-full border-4 border-greenM1" >
            <img src={avatarSVG} alt="avatar" className="rounded-full w-[100%] h-[100%] p-2"/>
            </div>
        )}
        </Link>
        <Link to={`${user.username}`}>
        <div className="flex items-center ml-6" id="suggested-name">
            <span className="font-semibold">{user.username}</span>
        </div>
        </Link>
        <div className="flex items-center ml-6" id="followBtn">
            <button className={`${following ? "bg-red": "bg-greenM1"} rounded py-2 px-4 font-bold text-grayM hover:bg-opacity-70`} id="followBtn2"
            onClick={handleFollowUnfollow}> 
                {following ? "Unfollow" : "Follow"}          
            </button>
        </div>
    </div>
    
  )
}

export default SuggestedUser