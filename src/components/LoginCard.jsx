import { Link } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import authScreenAtom from "../atoms/authAtom"
import { useState } from "react";
import { toast } from "react-toastify";
import userAtom from "../atoms/userAtom";
import Spinner from "./Spinner";

const LoginCard = () => {

    const setAuthScreen = useSetRecoilState(authScreenAtom);
    const setUser = useSetRecoilState(userAtom);
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
      });

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/users/login", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputs),
        });
        const data = await res.json();
        if(data.error){
            toast.error(
                data.error ,{style: { background: "#d6436e", color: '#3c444c'}}
            );
            return;
        } 

        localStorage.setItem("user-MySocial", JSON.stringify(data));
        setUser(data);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
          }
    };

    if( loading) {
        return (
          <Spinner/>
        )
      }

    
  return (
<div className="w-[50%] flex flex-col items-center justify-center min-w-96 mx-auto mt-20">
    <div className="w-full p-8 rounded-lg shadow-lg dark:bg-greenM4 bg-grayM border border-1 border-greenM1">
        <h1 className="text-xxl font-bold text-center mb-6 dark:text-gray-400 text-greenM1">
            Login
        </h1>

        <form >
            <div className="mt-4">
                <label className="label p-2">
                <span className="text-base text-greenM1">Username</span>
                </label>
                <input type="text" id="username" placeholder="Enter Username" className="dark:bg-blackM bg-whiteZinc w-full input input-bordered border-greenM1 h-10"
                onChange={(e)=> setInputs({...inputs, username: e.target.value})}
                value={inputs.username}/>
            </div>
            <div className="mt-4">
              <label className="label p-2">
                <span className="text-base text-greenM1">Password</span>
              </label>
              <input type="text" id="password" placeholder="Enter Password" className="dark:bg-blackM bg-whiteZinc w-full input input-bordered border-greenM1 h-10"
              onChange={(e)=> setInputs({...inputs, password: e.target.value})}
              value={inputs.password}/>
            </div>

            <div className="mt-12"> 
                <button className="w-full mt-4 rounded bg-greenM1 py-3 font-bold text-grayM hover:bg-opacity-70"
                onClick={handleLogin}> 
                    Login
                </button>
            </div>
            <div className="flex mt-10 mb-6 justify-center">
                <Link className="text-sm hover:underline hover:text-greenM1"
                onClick={() => setAuthScreen("signup")}>
                    Dont have an account yet?
                </Link>
            </div>

        </form>
    </div>      
</div>
  )
}

export default LoginCard