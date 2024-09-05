import { useRef, useState } from "react";
import usePreviewImg from "../hooks/usePreviewImg.js";
import imageSVG from"../assets/image.svg";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom.js";
import Modal from "./Modal.jsx";
import postsAtom from "../atoms/postsAtom.js";
import { useParams } from "react-router-dom";
import plusSVG from "../assets/plusSide.svg";


const MAX_CHAR = 500;

const CreatePost = () => {

    const [open, setOpen] = useState(false);
    const [postText, setPostText] = useState("");
    const {handleImageChange, imgUrl, setImgUrl} = usePreviewImg();
    const imageRef = useRef(null);
    const user = useRecoilValue(userAtom);
    const [posts, setPosts] = useRecoilState(postsAtom);
    const {username} = useParams();


    const handleTextChange = (e) => {
      const inputText = e.target.value;
      if(inputText.length > MAX_CHAR) {
        toast.error("Post can have max 500 char", {style: { background: "#d6436e", color: '#3c444c'}});
      }
      setPostText(inputText);
    };

    const handleCreatePost = async(e) => {
      e.preventDefault();
      try{
        const res = await fetch("/api/posts/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({postedBy: user._id, text: postText, img: imgUrl})
        })
        const data = await res.json();
        console.log(data)
        if(data.error) {
          toast.error(data.error, {style: { background: "#d6436e", color: '#3c444c'}});
          return;
        }
        toast.success("Post created successfully", {style: { background: "#25da72", color: '#3c444c'}});
        if(username === user.username) { // for creating post in another userpage
          setPosts([data, ...posts]);
        }
        setPostText("");
        setImgUrl("");
        

      } catch (error) {
        console.log(error);
      }
    };


  return (
    <>
        <div id="postBtn" className=" flex justify-center items-center rounded  font-bold"
        onClick={() => setOpen(true)}>
            <img src={plusSVG} alt="plus" id="menus-img" className="h-[2.5rem] w-[2.5rem] min-h-[2rem] min-w-[2rem]"/>
            <span className="flex items-center ml-4" id="menus">New Post</span>
        </div>

        <Modal open={open} onClose={() =>setOpen(false)}>
        <form onSubmit={handleCreatePost}>
        <div className="flex flex-col w-full p-8">
          <div className="w-full my-4">
            <h3 className="text-xl mr-auto p-2 font-bold text-greenM1">New Post</h3>
            <textarea className="w-full p-2 bg-transparent rounded outline-none mt-4 min-h-[150px] border border-greenM1 myText" 
            value={postText} onChange={handleTextChange} placeholder="Post content..." >
            </textarea>
            <input type="file" hidden ref={imageRef} onChange={handleImageChange}/>
            <div className="flex items-center cursor-pointer w-[50%]" onClick={() => imageRef.current.click()}>
              <img className="ml-5 mt-4" src={imageSVG}/>
              <span className="ml-4 mt-4 font-semibold"> Add Image...</span>
            </div>
          </div>

          {imgUrl && (
            <div className="mt-5 w-full relative">
              <img src={imgUrl} alt="selectedImg" className="max-h-[45vh]"/>
              <button type="button" className="absolute top-2 right-2 py-2 px-4 rounded-lg font-bold bg-red hover:opacity-70"
              onClick={() => setImgUrl("")}>
                X
              </button>
            </div>
          )}

          <div className="flex ml-auto mt-8 gap-4" id="modal-buttons">
            <button type="submit"  className="bg-greenM1 text-grayM font-bold py-2 px-6 rounded hover:opacity-70"
            onClick={() => setOpen(false)}> 
              Post
            </button>
            <button type="button" className="bg-red text-grayM font-bold py-2 px-6 rounded hover:opacity-70"
            onClick={() => setOpen(false)}>
                Cancel
            </button>
          </div>
        </div>
        </form>          
      </Modal>
      </>
  )
}

export default CreatePost;

