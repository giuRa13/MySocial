import { Link } from "react-router-dom";
import pirateSVG from "../assets/pirate.svg";

const Header = () => {
  return (
    <div className="flex flex-row justify-center mt-8 mb-16">
        <Link to={"/"}>
        <img src={pirateSVG} alt="pirateLogo"
        className="w-[3rem] h-[3rem] cursor-pointer"/>
       </Link>
    </div>
  )
}

export default Header