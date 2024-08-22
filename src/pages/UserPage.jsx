import { useEffect, useState } from "react"
import UserHeader from "../components/UserHeader"
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Post from "../components/Post";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState, useRecoilValue } from "recoil";
import postsAtom from "../atoms/postsAtom";
import LogoutButton from "../components/LogoutButton";
import avatarSVG from "../assets/avatar.svg";
import homeSVG from "../assets/home.svg";
import userAtom from "../atoms/userAtom";


const UserPage = () => {

  const {user, loading} = useGetUserProfile();
  const {username} = useParams(); // "username" as in the endpoint
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [fetchingPost, setFetchingPost] = useState(true);
  const userProfile = useRecoilValue(userAtom);

  const getPosts = async () => {
    setFetchingPost(true);
    try {
      const res = await fetch(`/api/posts/user/${username}`);
      const data = await res.json();
      console.log(data);
      setPosts(data);

    } catch (error) {
      toast.error(error, {style: { background: "#d6436e", color: '#3c444c'}});
      setPosts([]);
    } finally {
      setFetchingPost(false);
    }
  };

  useEffect(() => {

    getPosts();
    
  }, [username, setPosts]);


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
    <div className="w-[50%] mx-auto" id="userPage">
     
      <div className="flex flex-row justify-between  mt-0 mb-20">    
        < div className="flex ">
          <Link to={"/"}>
            <img src={homeSVG} alt="home" className="w-[2.5rem] h-[2.5rem]"/>
          </Link>
        </div>

        <div className="flex">
          <Link to={`/${userProfile.username}`}>
            <img src={avatarSVG} alt="profilePage" className="w-[3rem] h-[3rem]"/>
          </Link>
        </div>           
      </div>

    <UserHeader user={user}/>  

    <div className="fixed top-8 left-44">
      <LogoutButton/>
    </div>

    {!fetchingPost &&  posts.length === 0 &&(
      <div className="flex justify-center mt-12">
        <h2 className="flex text-lg font-semibold">
          User has no Posts yet
        </h2>
      </div>
    )}
    {fetchingPost && (
      <div className="flex justify-center my-40">
        <Spinner/>
      </div>
    )}

    {posts.map((post) => (
      <Post key={post._id} post={post} postedBy={post.postedBy}/>
    ))}
  </div>
  </>
}

export default UserPage