import { useEffect, useState } from "react";
import avatarSVG from "../assets/avatar.svg";
import Message from "./Message";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./MessageSkeleton";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtom";


const MessageContainer = () => {

  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [messages, setMessages] = useState([]);
  const currentUser = useRecoilValue(userAtom);


  useEffect(() => {
    const getMessages = async () => {
      setLoadingMessages(true);
      setMessages([]);
      try {
        const res = await fetch(`/api/messages/${selectedConversation.userId}`);
        const data = await res.json();
        if(data.error) {
          toast.error(data.error, {style: { background: "#d6436e", color: '#3c444c'}});
          return;
        }
        console.log("messages",data)
        setMessages(data);

      } catch (error) {
        toast.error(error.message, {style: { background: "#d6436e", color: '#3c444c'}});
      } finally {
        setLoadingMessages(false);
      }
    }
    getMessages();
  }, [selectedConversation.userId])


  return (
    <div className="flex flex-col w-full">
        
        <div className="flex w-full h-12 items-center my-4 gap-2">
            <div className=" avatar online inline-block items-center w-16 h-16 min-w-16 min-h-16 rounded-full border-2 border-greenM1">    
              <img src={selectedConversation.userProfilePic || avatarSVG} alt="user" className="rounded-full w-[100%] h-[100%]"/>
            </div>
            <h2 className="text-lg ml-2 font-semibold">{selectedConversation.name}</h2>
        </div>
        <hr className="mt-4 border-greenM1"/>

        <div className="flex flex-col gap-4 my-4 overflow-auto">
            {loadingMessages && [...Array(7)].map((_, idx) => <MessageSkeleton key={idx}/>)}
                      
            
            {!loadingMessages && (
                messages.map((message) => (
                  <div className="flex flex-col px-1" key={message._id}>
                    <Message  message={message} ownMessage={currentUser._id === message.sender}/>
                  </div> 
                ))          
            )}
                                 
        </div>
        
        <div className="mt-auto">
          <MessageInput setMessages={setMessages} />
        </div>
        
    </div>
  )
}

export default MessageContainer