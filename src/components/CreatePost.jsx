import { useRef, useState } from "react";
import usePreviewImg from "../hooks/usePreviewImg.js";
import plusSVG from "../assets/plus.svg";
import imageSVG from"../assets/image.svg";
import Modal from "./Modal.jsx";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom.js";

const MAX_CHAR = 500;

const CreatePost = () => {

    const [open, setOpen] = useState(false);
    const [postText, setPostText] = useState("");
    const {handleImageChange, imgUrl, setImgUrl} = usePreviewImg();
    const imageRef = useRef(null);
    const user = useRecoilValue(userAtom);


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
        setPostText("");
        setImgUrl("");

      } catch (error) {
        console.log(error);
      }
    };


  return (
    <>
        <button id="postBtn" type="button" className="fixed top-40 right-10 flex justify-center rounded 
        bg-greenM1 py-2 px-8 font-bold text-grayM hover:bg-opacity-70"
        onClick={() => setOpen(true)}>
            <div className="flex items-center">
                <img src={plusSVG} alt="plus" className=""/>
                <span className="ml-2">Post</span>
            </div>
        </button>

        <Modal  open={open} onClose={() =>setOpen(false)}>
        <form onSubmit={handleCreatePost}>
        <div className="flex flex-col w-full">
          <div className="w-full my-4">
            <h3 className="text-xl mr-auto p-2 font-bold text-greenM1">New Post</h3>
            <textarea className="w-full p-2 bg-transparent rounded outline-none mt-4 min-h-[150px] border border-greenM1" 
            value={postText} onChange={handleTextChange} >
            </textarea>
            <input type="file" hidden ref={imageRef} onChange={handleImageChange}/>
            <div className="flex items-center cursor-pointer w-[50%]" onClick={() => imageRef.current.click()}>
              <img className="ml-5 mt-4" src={imageSVG} onClick={() => imageRef.current.click()}/>
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

          <div className="flex ml-auto mt-8 gap-4">
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

