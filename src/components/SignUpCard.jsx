import { Link } from "react-router-dom"
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import { useState } from "react";
import { toast } from "react-toastify";
import userAtom from "../atoms/userAtom";

const SignUpCard = () => {

  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const setUser = useSetRecoilState(userAtom);
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/users/signup",{
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
      toast.success("Account created successfully", {style: { background: "#25da72", color: '#3c444c'}})

    } catch (error) {
      console.log(error);
    }
  };


  
  return (
<div className="w-[45%] flex flex-col items-center justify-center min-w-96 mx-auto ">
    <div className="w-full p-6 rounded-lg shadow-lg dark:bg-greenM4 bg-grayM border border-1 border-greenM1">
        <h1 className="text-xxl font-bold text-center mb-6 dark:text-gray-400 text-greenM1">
            SignUp
        </h1>

        <form>
            <div className="mt-4">
                <label className="label p-2" >
                <span className="text-base dark:text-greenM1 ">Full Name</span>
                </label>
                <input type="text" id="name" placeholder="Enter Full Name" className="dark:bg-blackM bg-whiteZinc w-full input input-bordered border-greenM1 h-10"
                onChange={(e)=> setInputs({...inputs, name: e.target.value})}
                value={inputs.name}/>
            </div>
            <div className="mt-4">
                <label className="label p-2" >
                <span className="text-base text-greenM1">Username</span>
                </label>
                <input type="text" id="username" placeholder="Enter Username" className="dark:bg-blackM bg-whiteZinc w-full input input-bordered border-greenM1 h-10"
                onChange={(e)=> setInputs({...inputs, username: e.target.value})}
                value={inputs.username}/>
            </div>
            <div className="mt-4">
              <label className="label p-2" >
                <span className="text-base text-greenM1">Email address</span>
              </label>
              <input type="email" id="mail" placeholder="Enter Email" className="dark:bg-blackM bg-whiteZinc w-full input input-bordered border-greenM1 h-10"
              onChange={(e)=> setInputs({...inputs, email: e.target.value})}
              value={inputs.email}/>
            </div>
            <div className="mt-4">
              <label className="label p-2" >
                <span className="text-base text-greenM1">Password</span>
              </label>
              <input type="text" id="password" placeholder="Enter Password" className="dark:bg-blackM bg-whiteZinc w-full input input-bordered border-greenM1 h-10"
              onChange={(e)=> setInputs({...inputs, password: e.target.value})}
              value={inputs.password}/>
            </div>
            

            <div className="mt-8"> 
                <button className="w-full mt-4 rounded bg-greenM1 py-3 font-bold text-grayM hover:bg-opacity-70"
                onClick={handleSignup}> 
                    Sign Up
                </button>
            </div>
            <div className="flex my-6 justify-center">
                <Link className="text-sm hover:underline hover:text-greenM1"
                onClick={() => setAuthScreen("login")}>
                    Already have an account?
                </Link>
            </div>

        </form>
    </div>      
</div>
  )
}

export default SignUpCard