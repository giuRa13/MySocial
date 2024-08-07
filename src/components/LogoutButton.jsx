import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {

    const setUser = useSetRecoilState(userAtom);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/users/logout",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = res.json();

            if(data.error) {
                toast.error(
                    data.error ,{style: { background: "#d6436e", color: '#3c444c'}}
                );
                return;
            }

            localStorage.removeItem("user-MySocial");
            setUser(null);
            navigate("/");

        } catch (error) {
            console.log(error)
        }
    };

  return (
    <button className="fixed top-5 right-10 rounded bg-red py-2 px-8 font-semibold text-grayM hover:bg-opacity-70"
    onClick={handleLogout}>
        Logout
    </button>
  )
}

export default LogoutButton;