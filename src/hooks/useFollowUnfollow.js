import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const useFollowUnfollow = (user) => {

    const currentUser = useRecoilValue(userAtom);
    const [following, setFollowing] = useState(user.followers.includes(currentUser?._id));
    console.log("Following ?",following);

    const handleFollowUnfollow = async () => {
        if(!currentUser) {
            toast.error("Please login to Follow", {style: {background: "#d6436e", color: '#3c444c'}});
            return;
        }
        try {
            const res = await fetch(`/api/users/follow/${user._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await res.json();
            if(data.error) {
                toast.error(data.error, {style: { background: "#d6436e", color: '#3c444c'}});
                return;
            }

            setFollowing(!following);
            if(following) {
                toast.success(`Stop Following ${user.name}`, {style: { background: "#33cc66", color: '#3c444c'}});
            } else {
                toast.success(`Start to follow ${user.name}`, {style: { background: "#33cc66", color: '#3c444c'}});
            }
            
        } catch (error) {
            console.log("Error: ", error);
        }
    };
    return { handleFollowUnfollow, following};
}

export default useFollowUnfollow;