//import { useRecoilValue } from "recoil"
//import userAtom from "../atoms/userAtom"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Post from "../components/Post";

const HomePage = () => {

  //const currentUser = useRecoilValue(userAtom);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeedPosts = async() => {
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();
        if(data.error) {
          toast.error(data.error, {style: { background: "#d6436e", color: '#3c444c'}});
          return;
        }
        console.log(data);
        setPosts(data);

      } catch (error) {
        toast.error(error, {style: { background: "#d6436e", color: '#3c444c'}})
      } finally {
        setLoading(false);
      }
    };
    getFeedPosts();
    }, []);


  return (

    <>
      {loading && (
        <div className="flex justify-center">
          <Spinner/>
        </div>
      )}
      {!loading && posts.length === 0 && ( //not following anyone
        <div className="flex justify-center">
          <h1 className="flex text-lg font-semibold">Start to follow somebody to see their post...</h1>
        </div>
      )}

      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy}/>
      ) )}
    </>
  
  )
};

export default HomePage;