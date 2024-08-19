import logoutSVG from "../assets/logout.svg";
import useLogout from "../hooks/useLogout";

const LogoutButton = () => {

    const {handleLogout} = useLogout();


  return (
    <button className="rounded bg-red py-2 px-6 font-bold text-grayM hover:bg-opacity-70"
    onClick={handleLogout}>
        <div className="flex items-center">
            <img src={logoutSVG} alt="logout"/>
            <span className="ml-2">Logout</span>
        </div>
    </button>
  )
}

export default LogoutButton;