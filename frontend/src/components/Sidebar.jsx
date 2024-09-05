import { Link } from "react-router-dom";
import CreatePost from "./CreatePost";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import homeSvg from "../assets/home.svg";
import avatarSvg from "../assets/avatar.svg";
import logoutSvg from "../assets/logoutSide.svg";
import chatSvg from "../assets/chat.svg";
import useLogout from "../hooks/useLogout";

//dark:bg-greenM4 bg-grayM border border-1 border-greenM1
const Sidebar = () => {

    const user = useRecoilValue(userAtom);
    const {handleLogout} = useLogout();


  return (
    <div className="min-h-screen p-5 pt-0 fixed justify-center ml-12" id="sidebar">

        <Link to={"/"}>
            <div className="flex mb-6 gap-4 text-md font-semibold items-center cursor-pointer p-2 rounded-md md:hover:bg-greenM3">
                <img src={homeSvg} className="h-[2.5rem] w-[2.5rem] min-h-[2rem] min-w-[2rem]" id="menus-img"/>
                <span id="menus">Homepage</span>
            </div>
        </Link>
        <Link to={`/${user.username}`}>
            <div className="flex mb-6 gap-4 text-md font-semibold items-center cursor-pointer p-2 rounded-md md:hover:bg-greenM3">
                <img src={avatarSvg} className="h-[2.5rem] w-[2.5rem] min-h-[2rem] min-w-[2rem]" id="menus-img"/>
                <span id="menus">Profile</span>
            </div>
        </Link>
            <div className="flex mb-6 gap-4 text-md font-semibold items-center cursor-pointer p-2 rounded-lg md:hover:bg-greenM3">
                <CreatePost/>
            </div>
        <Link to={"/chat"}>
            <div className="flex mb-6 gap-4 text-md font-semibold items-center cursor-pointer p-2 rounded-md md:hover:bg-greenM3">
                <img src={chatSvg} className="h-[2.5rem] w-[2.5rem] min-h-[2rem] min-w-[2rem]" id="menus-img"/>
                <span id="menus">Chat</span>
            </div>
        </Link>
            <div className="flex mb-6 gap-4 text-md font-semibold items-center cursor-pointer p-2 rounded-md md:hover:bg-greenM3"
            onClick={handleLogout}>
                <img src={logoutSvg} className="h-[2.5rem] w-[2.5rem] min-h-[2rem] min-w-[2rem]" id="menus-img"/>
                <span className="text-red" id="menus">Logout</span>
            </div>
    </div>
  ) 
}; 

export default Sidebar