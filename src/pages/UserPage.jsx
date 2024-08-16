import { useEffect, useState } from "react"
import UserHeader from "../components/UserHeader"
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Post from "../components/Post";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";


const UserPage = () => {

  const {user, loading} = useGetUserProfile();
  const {username} = useParams(); // "username" as in the endpoint
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [fetchingPost, setFetchingPost] = useState(true);

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
 
    <UserHeader user={user}/>   

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

  </>
}

export default UserPage