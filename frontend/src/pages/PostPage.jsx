import avatarSVG from "../assets/avatar.svg";
import homeSVG from "../assets/home.svg";
import verifiedSVG from "../assets/verified.svg";
import Actions from "../components/Actions";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useGetUserProfile from "../hooks/useGetUserProfile";
import Spinner from "../components/Spinner";
import { formatDistanceToNow } from "date-fns";
import { Link, useNavigate, useParams } from "react-router-dom";
import deleteSVG from "../assets/delete.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import Comment from "../components/Comment";
import postsAtom from "../atoms/postsAtom";
import LogoutButton from "../components/LogoutButton";

const PostPage = () => {

  const {user, loading} = useGetUserProfile();
  const {pId} = useParams();
  const currentUser = useRecoilValue(userAtom);
  const navigate = useNavigate();

  const [posts, setPosts] = useRecoilState(postsAtom);
  const currentPost = posts[0];

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/posts/${pId}`);
        const data = await res.json();
        if(data.error) {
          toast.error(data.error, {style: { background: "#d6436e", color: '#3c444c'}});
          return;
        }
        console.log(data);
        setPosts([data]);

      } catch (error) {
        toast.error(error, {style: { background: "#d6436e", color: '#3c444c'}});
      }
    };
    getPost();
  }, [pId, setPosts]);

  const handleDeletePost = async() => {
    try {
      if(!window.confirm("Are you sure to delete this post?")) return;

      const res = await fetch(`/api/posts/${currentPost._id}`, {
          method: "DELETE",
      });
      const data = await res.json();
      if(data.error) {
          toast.error(data.error, {style: { background: "#d6436e", color: '#3c444c'}});
          return;
      }
      toast.success("Post deleted successfully", {style: { background: "#25da72", color: '#3c444c'}});
      navigate(`/${user.username}`);

  } catch (error) {
      toast.error(error, {style: { background: "#d6436e", color: '#3c444c'}})
  }
  };

  if(!user && loading) {
    return (
      <Spinner/>
    )
  }

  if(!currentPost) return null;

  return (
  <> 
  <div className="fixed top-8 right-32" id="logout-btn">
      <LogoutButton/>
  </div>

  <div className="flex flex-col w-[50%] mx-auto " id="postPage">
    <div className="flex flex-row justify-between  mt-0 mb-20">    
      < div className="flex ">
        <Link to={"/"}>
          <img src={homeSVG} alt="home" className="w-[2.5rem] h-[2.5rem]"/>
        </Link>
      </div>

      <div className="flex">
        <Link to={`/${user.username}`}>
          <img src={avatarSVG} alt="profilePage" className="w-[3rem] h-[3rem]"/>
        </Link>
      </div>           
    </div>

    <div className="flex items-center w-full">   
      <Link to={`/${user.username}`}>
      { user.profilePic && (
        <div className="inline-block items-center w-28 h-28 min-w-28 min-h-28 rounded-full border-4 border-greenM1" id="postPage1">
          <img src={user.profilePic} alt="avatar" className="rounded-full w-[100%] h-[100%] "/>
        </div>
      )}
      { !user.profilePic &&(
        <div className="inline-block items-center w-28 h-28 min-w-28 min-h-28 rounded-full border-4 border-greenM1" id="postPage1">
          <img src={avatarSVG} alt="avatar" className="rounded-full w-[100%] h-[100%] p-2"/>
        </div>
      )}
      </Link>  
      <div className="flex justify-between w-full ml-4" id="postPage2">
        <Link to={`/${user.username}`}>
        <div className="flex gap-2 items-center">
        <h3 className="font-bold text-xl mr-2"> {user.name}</h3>
          <img src={verifiedSVG} alt="verified" />
        </div>
        </Link> 
        <div className="flex gap-4 items-center" id="postPage3">
          <h3 className="font-bold text-lg text-grayM mr-2"> {formatDistanceToNow(new Date(currentPost.createdAt))} ago</h3>
          {currentUser?._id === user._id && (
            <button onClick={handleDeletePost}>
              <img src={deleteSVG} alt="trash" />
            </button>
          )}
        </div>
      </div>           
    </div>

    <div className="my-4">
      <h3 className="text-md font-bold mb-2">{currentPost.text}</h3>
    </div>

    <div className="flex flex-col w-full gap-2">
      {currentPost.img &&(
      <div className="border border-greenM1 rounded  overflow-hidden">
        <img className="w-full" src={currentPost.img}/>
      </div>)}
      <div className="flex my-8">
        < Actions post={currentPost}/>     
      </div>    
    </div>

    <hr className="my-4 border-greenM1"/>

    <div className="flex justify-between items-center py-2">
        <div className="items-center gap-4">
          <span className="text-xl">👋</span>
          <span className="text-grayM text-lg font-semibold">Get the app to like, reply and post!</span>
        </div>
        <button className="rounded bg-greenM1 py-2 px-8 font-semibold text-grayM hover:bg-opacity-70">
          Get
        </button>
    </div>

    <hr className="my-4 border-greenM1"/>

  </div>

  {currentPost.replies.length === 0 && (
    <div className="flex justify-center mt-8">
      <h2 className="font-semibold text-lg">No replies yet</h2>
    </div>
  )}

  {currentPost.replies.map(reply => (
    <Comment key={reply._id} reply={reply}/>
  ))}

  </>
  )
}

export default PostPage