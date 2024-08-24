import { useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtom";
import avatarSVG from "../assets/avatar.svg";

const Conversation = () => {

    const user = useRecoilValue(userAtom);

  return (
    <div className="flex items-center p-2 cursor-pointer rounded-lg my-4 border border-1 border-greenM1  hover:opacity-70">
        <div className=" avatar online inline-block items-center w-16 h-16 min-w-16 min-h-16 rounded-full border-2 border-greenM1">    
              <img src={user.profilePic || avatarSVG} alt="user" className="rounded-full w-[100%] h-[100%]"/>
        </div>
        <div className="flex flex-col">
            <div className="flex">
                <span className="font-semibold text-md ml-2" id="chatUsername">{user.name}</span>
                <span className="font-semibold text-md ml-2" id="chatUsername2">@{user.username}</span>
            </div>
            <div className="flex ml-2">
                <span>some message message text...</span>
            </div>
        </div>
    </div>
  )
}

export default Conversation