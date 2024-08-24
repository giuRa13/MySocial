import { useEffect, useState } from "react";
import SuggestedUser from "./SuggestedUser";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import avatarSVG from "../assets/avatar.svg";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link } from "react-router-dom";

const SuggestedUsers = () => {

    const [loading, setLoading] = useState(true);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const user = useRecoilValue(userAtom);

    useEffect(() => {
      const getSuggestedUsers = async () => {
        setLoading(true);
        try {
          const res = await fetch("/api/users/suggested");
          const data = await res.json();
          if(data.error) {
            toast.error(data.error, {style: { background: "#d6436e", color: '#3c444c'}});
            return
          }
          console.log(data);
          setSuggestedUsers(data);

        } catch (error) {
          toast.error(error, {style: { background: "#d6436e", color: '#3c444c'}});
        }
        finally {
          setLoading(false);
        }
      }

      getSuggestedUsers();
    }, [])

  return (
    <>
      {user && (
      <Link to={`/${user.username}`}>
      <div className="fixed w-[20%] top-8 right-2 hover:opacity-70" id="userBadge">        
        < div className="flex rounded-lg items-center px-4 py-2 bg-greenM3 dark:bg-greenM4" id="userBadge2">    
            <div className="inline-block items-center w-16 h-16 min-w-16 min-h-16 rounded-full border-4 border-greenM1">    
              <img src={user.profilePic || avatarSVG} alt="user" className="rounded-full w-[100%] h-[100%]"/>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-md ml-4" id="userBadge3">{user.name}</span>
              <span className="font-semibold text-md ml-4" id="userBadge3">@{user.username}</span>
            </div>
        </div>
      </div>
      </Link>)}

    <div className="flex flex-col  fixed pl-6 justify-center" id="suggested">
        <h1 className="mb-6 text-md font-bold" id="who">Who to Follow</h1>
        {!loading && suggestedUsers.map(user => <SuggestedUser key={user._id} user={user}/>)}
        {loading &&
            <div className="">
                <Spinner/>
            </div>
        }
    </div>
    </>
  )
}

export default SuggestedUsers