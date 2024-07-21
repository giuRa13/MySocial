import { Link } from "react-router-dom";
import avatarSVG from "../assets/avatar.svg";
import twitterSVG from "../assets/twitter.svg";
import moreSVG from "../assets/more.svg";

const UserHeader = () => {
  return (
    <div className="flex flex-col items-center gap-6">

        <div className="flex justify-between items-center w-full">
            <div className="flex flex-col">
                <div className="flex">
                    <h2 className="font-bold text-2xl">
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
            <div>
                <img src={avatarSVG} alt="avatar"/>
            </div>
        </div>

        <p className="mr-auto">Biografy bio asdasdasd test Biografy Biografy bio asdasdasd test Biografy...</p>

        <div className="flex justify-between items-center w-full">
            <div className="flex gap-2 items-center opacity-70">
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
                <a href="#" target={"_blank"} className="rounded-full p-1.5 hover:bg-greenM3">
                    <img src={moreSVG} alt="more" className="h-[2.5rem] w-[2.5rem]"/>
                </a>
            </div>
        </div>

    </div>
  )
}

export default UserHeader