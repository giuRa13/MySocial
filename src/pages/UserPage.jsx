import { useEffect, useState } from "react"
import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const UserPage = () => {

  const [user, setUser] = useState(null);
  const {username} = useParams(); // "username" as in the endpoint
  const [loading, setLoading] = useState(true);

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

  if(!user && loading) {
    return (
      <Spinner/>
    )
  }
  if(!user && !loading) {
    return(<div className="flex justify-center">
      <h1 className="flex text-lg font-semibold">User not Found</h1>
    </div>
    )
  }


  return <>
 
    <UserHeader user={user}/>   
    <UserPost likes={723} replies={311} postImg="/peter.jpg" postTitle="PostTitle1"/>
    <UserPost likes={143} replies={72} postImg="/ai_processor.jpg" postTitle="ai generated processor"/>
    <UserPost likes={1003} replies={37} postImg="/cat.jpg" postTitle="this is a cat"/>

  </>
}

export default UserPage