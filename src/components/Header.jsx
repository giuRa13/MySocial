import { Link } from "react-router-dom";
import pirateSVG from "../assets/pirate.svg";
//import homeSVG from "../assets/home.svg";
//import avatarSVG from "../assets/avatar.svg";
//import { useRecoilValue } from "recoil";
//import userAtom from "../atoms/userAtom";


const Header = () => {

  //const user = useRecoilValue(userAtom);

  return (
    <div className="w-full justify-center mt-16 mb-6" id="header-responsive">

      <div className="flex justify-center">
        <Link to={"/"}>
          <img src={pirateSVG} alt="pirateLogo"
          className="w-[5rem] h-[5rem] cursor-pointer flex justify-center"/>
        </Link>
      </div>

      {/*{user && (
      <div className="flex flex-row justify-between  mt-0 mb-20">    
        < div className="flex ">
          <Link to={"/"}>
            <img src={homeSVG} alt="home" className="w-[2.5rem] h-[2.5rem]"/>
          </Link>
        </div>

        <div className="flex">
          <Link to={`/${user.username}`}>
            <img src={avatarSVG} alt="profilePage" className="w-[3rem] h-[3rem]"/>
          </Link>
        </div>           
      </div>)
      }*/}

     </div>
  )
}

export default Header