import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const useGetUserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const {username} = useParams();

    useEffect(() => {
        const getUser = async() => {
            try {
              const res = await fetch(`/api/users/profile/${username}`)
              const data = await res.json();
              console.log(data);
      
              if(data.error) {
                toast.error(data.error, {style: { background: "#d6436e", color: '#3c444c'}});
                return;
              }
              setUser(data);
      
            } catch (error) {
                toast.error(error, {style: { background: "#d6436e", color: '#3c444c'}});
            } finally {
              setLoading(false);
            }
          };
          getUser();
    }, [username]);

    return {loading, user}
};

export default useGetUserProfile;