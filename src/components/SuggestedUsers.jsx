import { useEffect, useState } from "react";
import SuggestedUser from "./SuggestedUser";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

const SuggestedUsers = () => {

    const [loading, setLoading] = useState(true);
    const [suggestedUsers, setSuggestedUsers] = useState([]);

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