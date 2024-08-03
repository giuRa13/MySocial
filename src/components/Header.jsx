import { Link } from "react-router-dom";
import pirateSVG from "../assets/pirate.svg";

const Header = () => {
  return (
    <div className="flex flex-row justify-center mt-20 mb-20">
        <Link to={"/"}>
        <img src={pirateSVG} alt="pirateLogo"
        className="w-[4rem] h-[4rem] cursor-pointer"/>
       </Link>
    </div>
  )
}

export default Header