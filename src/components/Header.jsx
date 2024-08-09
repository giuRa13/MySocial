import { Link } from "react-router-dom";
import pirateSVG from "../assets/pirate.svg";
import homeSVG from "../assets/home.svg";
import avatarSVG from "../assets/avatar.svg";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";


const Header = () => {

  const user = useRecoilValue(userAtom);

  return (
    <div className=" justify-center mt-20 mb-10">

      <div className="flex justify-center">
        <Link to={"/"}>
          <img src={pirateSVG} alt="pirateLogo"
          className="w-[4rem] h-[4rem] cursor-pointer flex justify-center"/>
        </Link>
      </div>

      {user && (
      <div className="flex flex-row justify-between  mt-0 mb-20">    
        < div className="flex ">
          <Link to={"/"}>
            <img src={homeSVG} alt="home"/>
          </Link>
        </div>

        <div className="flex">
          <Link to={`/${user.username}`}>
            <img src={avatarSVG} alt="profilePage" className="w-[2.5rem] h-[2.5rem]"/>
          </Link>
        </div>           
      </div>)
      }

     </div>
  )
}

export default Header