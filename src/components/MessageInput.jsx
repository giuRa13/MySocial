import { useState } from "react";
import planeSVG from "../assets/plane.svg";
import { toast } from "react-toastify";
import {  useRecoilValue } from "recoil";
import {  selectedConversationAtom } from "../atoms/messagesAtom";

const MessageInput = ({setMessages}) => {

    const [loading, setLoading] = useState(false);
    const [messageText, setMessageText] = useState("");
    const selectedConversation = useRecoilValue(selectedConversationAtom);
    //const setConversations = useRecoilState(conversationsAtom);


    const handleSendMessage = async (e) => {
      e.preventDefault();
      setLoading(true);
      if(!messageText) return;
      try {
        const res = await fetch("/api/messages", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            message: messageText,
            recipientId: selectedConversation.userId,
          }),
        });
        const data = await res.json();
        if(data.error) {
          toast.error(data.error, {style: { background: "#d6436e", color: '#3c444c'}});
          return;
        }
        setMessages((messages) => [...messages, data]);
        
        {/*setConversations((prevConvs) => {
          const updatedConversations = prevConvs.map((conversation) => {
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
        });*/}
        setMessageText("");

      } catch (error) {
        toast.error(error.message, {style: { background: "#d6436e", color: '#3c444c'}});
      } finally {
        setLoading(false)
      }
    }


  return (
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
  )
}

export default MessageInput