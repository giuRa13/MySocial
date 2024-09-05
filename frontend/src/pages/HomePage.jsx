import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import Sidebar from "../components/Sidebar";
import SuggestedUsers from "../components/SuggestedUsers";


const HomePage = () => {

  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeedPosts = async() => {
      setLoading(true);
      setPosts([]); // for no see posts before homepage when go to homepage
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
    }, [setPosts]);


  return (

    <>
    <div className="flex gap-8" id="homePage1">
      <div className="flex flex-col w-[20%]  min-h-screen" id="menu">
        <Sidebar/>
      </div>

      <div className="flex flex-col w-[60%]" id="homePage">
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
        </div>

        <div className="flex flex-col w-[20%] min-h-screen" id="suggestedUsers"> 
          <SuggestedUsers />
        </div>
      
      </div>
    </>
  
  )
};

export default HomePage;