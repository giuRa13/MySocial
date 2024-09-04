import { useRef, useState } from "react";
import planeSVG from "../assets/plane.svg";
import { toast } from "react-toastify";
import {   useRecoilValue, useSetRecoilState } from "recoil";
import {   conversationsAtom, selectedConversationAtom } from "../atoms/messagesAtom";
import Modal from "./Modal.jsx";
import imageSVG from"../assets/image.svg";
import usePreviewImg from "../hooks/usePreviewImg.js";

const MessageInput = ({setMessages}) => {

    const [loading, setLoading] = useState(false);
    const [messageText, setMessageText] = useState("");
    const selectedConversation = useRecoilValue(selectedConversationAtom);
    const setConversations = useSetRecoilState(conversationsAtom);

    const [open, setOpen] = useState(false);
    const imageRef = useRef(null);
    const {handleImageChange, imgUrl, setImgUrl} = usePreviewImg();
    const [isSending, setIsSending] = useState(false);


    const handleSendMessage = async (e) => {
      e.preventDefault();
      setLoading(true);

      if(!messageText && !imgUrl) return;
      if(isSending) return;
      setIsSending(true);
      try {
        const res = await fetch("/api/messages", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            message: messageText,
            recipientId: selectedConversation.userId,
            img: imgUrl,
          }),
        });
        const data = await res.json();
        console.log("Data", data)
        if(data.error) {
          toast.error(data.error, {style: { background: "#d6436e", color: '#3c444c'}});
          return;
        }
        setMessages((messages) => [...messages, data]);
        
        setConversations((prevC) => {
          const updatedConversations = prevC.map((conversation) => {
            if(conversation._id === selectedConversation._id) {
              return {
                ...conversation,
                lastMessage: {
                  text: messageText,
                  sender: data.sender,
                },
              };
            }
            return conversation;
          });
          return updatedConversations;
        });
        setMessageText("");
        setImgUrl("");

      } catch (error) {
        toast.error(error.message, {style: { background: "#d6436e", color: '#3c444c'}});
      } finally {
        setLoading(false);
        setIsSending(false);
      }
    }


  return (
    <div className="flex gap-2">
    <form className="flex w-full" onSubmit={handleSendMessage}>
        <div className="w-full relative">
            <input type="text" className="w-full p-3.5 rounded-lg h-14 bg-whiteZinc dark:bg-blackM border-4 border-greenM1"
            placeholder="Send a Message" 
            value={messageText}
            onChange={(e)=>setMessageText(e.target.value)}/>
            <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-4"
            >
              {loading ?  <span className="loading loading-spinner text-greenM1"></span> 
               : <img src={planeSVG} className="w-8 h-8 hover:w-9 hover:h-9"/>}         
            </button>  
        </div>
    </form>
        
      <button className=" flex justify-center items-center"
      onClick={() => setOpen(true)}>
        {!isSending ? (
          <img alt="chose" src={imageSVG} className="h-10 w-10 hover:w-12 hover:h-12"/>
        ) : (
          <span className="loading loading-spinner text-greenM1"></span> 
        )}
      </button>
      <Modal id="chat-modal" open={open} onClose={() =>setOpen(false) }>
        <form onSubmit={handleSendMessage}>
        <div className="flex flex-col w-full p-8">
          <div className="w-full my-4">
            <h3 className="text-xl  p-2 font-bold">Chose an Image...</h3>
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
              Send
            </button>
            <button type="button" className="bg-red text-grayM font-bold py-2 px-6 rounded hover:opacity-70"
            onClick={() => setOpen(false)}>
                Cancel
            </button>
          </div>
        </div>
        </form>          
      </Modal>
    </div>
  )
}

export default MessageInput