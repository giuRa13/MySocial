import { Link } from "react-router-dom";
import avatarSVG from "../assets/avatar.svg";
import twitterSVG from "../assets/twitter.svg";
import moreSVG from "../assets/more.svg";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useFollowUnfollow from "../hooks/useFollowUnfollow";

const UserHeader = ({user}) => {

    const currentUser = useRecoilValue(userAtom);
    const { handleFollowUnfollow, following} = useFollowUnfollow(user);
    const [open, setOpen] = useState(false);

    const copyUrl = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
            toast("Copied to clippboard!",{style:{background: "var(--greenM2)", color: "var(--greenM4)"}})
        });
    };



  return (
    <div className="flex flex-col items-center gap-8">

        <div className="flex justify-between items-center w-full">
            <div className="flex flex-col gap-2">
                <div className="flex">
                    <h2 className="font-bold text-xxl">
                        {user.name}
                    </h2>
                </div>
                <div className="flex">
                    <h3 className="font-semibold text-md">
                        @{user.username}
                    </h3>
                    <h3 className="bg-greenM3 rounded-md px-4 ml-2 text-md text-greenM3 bg-opacity-65">
                        {user.username}
                    </h3>
                </div>
            </div>
            { user.profilePic && (
                <div className="inline-block items-center w-28 h-28 rounded-full border-4 border-greenM1">
                    <img src={user.profilePic} alt="avatar" className="rounded-full w-[100%] h-[100%] bg-greenM1"/>
                </div>
            )}
            { !user.profilePic &&(
            <div className="inline-block items-center w-28 h-28 rounded-full border-4 border-greenM1">
                <img src={avatarSVG} alt="avatar" className="rounded-full w-[100%] h-[100%] p-2"/>
            </div>
            )}
        </div>
        <p className="mr-auto">{user.bio}</p>

        {currentUser?._id === user._id && (
            <Link to={"/update"} className="mr-auto">
                <button className="rounded bg-greenM1 py-2 px-4 font-semibold text-grayM hover:bg-opacity-70">
                    Update profile
                </button>
            </Link>
        )}
        {currentUser?._id !== user._id && 
            <button className="rounded bg-greenM1 py-2 px-8 font-semibold text-grayM hover:bg-opacity-70 mr-auto"
            onClick={handleFollowUnfollow}>
                {following ? "Unfollow" : "Follow"}
            </button>
        }


        <div className="flex justify-between items-center w-full">
            <div className="flex gap-2 items-center opacity-70 ">
                <span>{user.followers.length} Followers</span>
                <div className="w-1 h-1 bg-greenM1 rounded-full"></div>
                <span>{user.following.length} Following</span>
                {/*<Link to="#">
                    <span className="hover:underline">www.theSite.com</span>
                </Link> */}              
            </div>
            <div className="flex">
                <a href="https://x.com/" target={"_blank"} className="rounded-full p-1.5 hover:bg-greenM3">
                    <img src={twitterSVG} alt="twitter" className="h-[2.5rem] w-[2.5rem]"/>
                </a>
                <div className="rounded-full p-1.5 hover:bg-greenM3 cursor-pointer relative" 
                onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                    <img src={moreSVG} alt="more" className="h-[2.5rem] w-[2.5rem]"/>
                    { open && 
                    <ul className="absolute z-1 ml-2 gap-1">
                        <li className="rounded py-2 px-4 bg-greenM3 border border-greenM1 mt-0.5 hover:opacity-80"
                        onClick={() => copyUrl()}>Copy&nbsp;Link</li>
                        <li className="rounded py-2 px-4 bg-greenM3 border border-greenM1 mt-0.5 hover:opacity-80">Copy&nbsp;Link</li>
                        <li className="rounded py-2 px-4 bg-greenM3 border border-greenM1 mt-0.5 hover:opacity-80">Copy&nbsp;Link</li>
                    </ul>
                    }
                </div>
            </div>
        </div>

        <div className="flex w-full mt-2">
            <div className="flex w-[50%] justify-center border-b-2 border-b-greenM1 cursor-pointer
            hover:bg-greenM1 hover:bg-opacity-40">
                    <h2 className="text-lg font-bold mb-2">Post</h2>
            </div>
            <div className="flex w-[50%] justify-center border-b-2 border-b-grayM text-grayM cursor-pointer
            hover:bg-greenM1 hover:bg-opacity-40">
                <h2 className="text-lg font-bold mb-2">Replies</h2>
            </div>
        </div>
    </div>
  )
}

export default UserHeader