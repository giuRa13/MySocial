import { Link } from "react-router-dom";
import avatarSVG from "../assets/avatar.svg";
import twitterSVG from "../assets/twitter.svg";
import moreSVG from "../assets/more.svg";
import { useState } from "react";
import { toast } from "react-toastify";

const UserHeader = () => {

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
                    <h2 className="font-bold text-xl">
                        Full BigName
                    </h2>
                </div>
                <div className="flex">
                    <h3 className="font-semibold text-md">
                        @name.surname
                    </h3>
                    <h3 className="bg-greenM3 rounded-md px-4 ml-2 text-md text-greenM3 bg-opacity-65">
                        Name
                    </h3>
                </div>
            </div>
            <div className="rounded-full border-4 border-greenM1 p-2">
                <img src={avatarSVG} alt="avatar"/>
            </div>
        </div>

        <p className="mr-auto">Biografy bio asdasdasd test Biografy Biografy bio asdasdasd test Biografy...</p>

        <div className="flex justify-between items-center w-full">
            <div className="flex gap-2 items-center opacity-70 ">
                <span>2.1M Followers</span>
                <div className="w-1 h-1 bg-greenM1 rounded-full"></div>
                <Link to="#">
                    <span className="hover:underline">www.theSite.com</span>
                </Link>               
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