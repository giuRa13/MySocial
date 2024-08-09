import { useEffect, useRef, useState } from "react";
//import avatarSVG from "../assets/avatar.svg";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom.js";
import usePreviewImg from "../hooks/usePreviewImg";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const UpdateProfilePage = () => {
    
    const [user, setUser] = useRecoilState(userAtom);
    const [inputs, setInputs] = useState({
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        password: "",
      });
    const fileRef = useRef("");
    const {handleImageChange, imgUrl} = usePreviewImg();

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const res = await fetch(`/api/users/update/${user._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...inputs, profilePic: imgUrl}),
        });
        const data = await res.json();
        console.log(data);
        if(data.error) {
          toast.error(data.error, {style: { background: "#d6436e", color: '#3c444c'}});
          return;
        }
        toast.success("Profile updated successfully", {style: {background: "#25da72", color: '#3c444c'}});
        setUser(data.user);
        localStorage.setItem("user-MySocial", JSON.stringify(data));
      } 
      catch (error) {
        toast.error(error, {style: { background: "#d6436e", color: '#3c444c'}});
      }
    };

    useEffect(() => {
      localStorage.setItem("user-MySocial", JSON.stringify(user));
      setInputs(inputs)
    }, [user] );

  return (
    <div className="w-[50%] flex flex-col items-center justify-center min-w-96 mx-auto my-12">
    <div className="w-full p-6 rounded-lg shadow-lg dark:bg-greenM4 bg-grayM border border-1 border-greenM1">
        <h1 className="text-xxl font-bold text-center mb-6 dark:text-gray-400 text-greenM1">
            User Profile Edit
        </h1>

        <form onSubmit={handleSubmit} >
            <div className="flex w-full items-center justify-between" id="userName">
                <div className="pl-4">
                    <div className="inline-block items-center w-24 h-24 rounded-full border-2 border-greenM1" >
                        <img className="rounded-full w-[100%] h-[100%]" src={imgUrl || user.profilePic} alt=""/> { /*object-contain*/ }
                    </div>{/*user.profilePic ? user.profilePic : avatarSVG*/ } {/*imgUrl ? user.profilePic : avatarSVG */}
                </div>
                <div className="pr-4">
                    <button type="button" className="rounded bg-greenM1 py-2 px-8 font-semibold text-grayM hover:bg-opacity-70"
                    onClick={ () => fileRef.current.click()}>
                        Change Avatar
                    </button>
                    <input id="profilePic" type="file" accept="image/*" hidden ref={fileRef} onChange={handleImageChange}/>
                </div>
            </div>
            <div className="mt-4">
                <label className="label p-2" >
                <span className="text-base dark:text-greenM1 ">Full Name</span>
                </label>
                <input type="text" id="name" placeholder="Full Name" className="dark:bg-blackM bg-whiteZinc w-full input input-bordered border-greenM1 h-10"
                onChange={(e)=> setInputs({...inputs, name: e.target.value})}
                value={inputs.name}/>
            </div>
            <div className="mt-4">
                <label className="label p-2" >
                <span className="text-base text-greenM1">Username</span>
                </label>
                <input type="text" id="username" placeholder="Username" className="dark:bg-blackM bg-whiteZinc w-full input input-bordered border-greenM1 h-10"
                onChange={(e)=> setInputs({...inputs, username: e.target.value})}
                value={inputs.username}/>
            </div>
            <div className="mt-4">
              <label className="label p-2" >
                <span className="text-base text-greenM1">Email address</span>
              </label>
              <input type="email" id="mail" placeholder="Email" className="dark:bg-blackM bg-whiteZinc w-full input input-bordered border-greenM1 h-10"
              onChange={(e)=> setInputs({...inputs, email: e.target.value})}
              value={inputs.email}/>
            </div>
            <div className="mt-4">
              <label className="label p-2" >
                <span className="text-base text-greenM1">Bio</span>
              </label>
              <input type="text" id="bio" placeholder="Biography..." className="dark:bg-blackM bg-whiteZinc w-full input input-bordered border-greenM1 h-10"
              onChange={(e)=> setInputs({...inputs, bio: e.target.value})}
              value={inputs.bio}/>
            </div>
            <div className="mt-4">
              <label className="label p-2" >
                <span className="text-base text-greenM1">Password</span>
              </label>
              <input type="text" id="password" placeholder="Password" className="dark:bg-blackM bg-whiteZinc w-full input input-bordered border-greenM1 h-10"
              onChange={(e)=> setInputs({...inputs, password: e.target.value})}
              value={inputs.password}/>
            </div>
            
            <div className="flex w-full mt-12 items-center justify-between">
                <div className="px-2 w-full"> 
                  <Link to={`/${user.username}`}>
                    <button type="button" className="w-full rounded bg-red py-3 font-bold text-grayM hover:bg-opacity-70"> 
                        Cancel
                    </button>
                    </Link>
                </div>
                <div className="px-2 w-full">
                    <button className="w-full rounded bg-greenM1 py-3 font-bold text-grayM hover:bg-opacity-70"
                    onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </form>
    </div>      
</div>
  )
}

export default UpdateProfilePage