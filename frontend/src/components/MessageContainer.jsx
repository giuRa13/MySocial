import { useEffect, useRef, useState } from "react";
import avatarSVG from "../assets/avatar.svg";
import Message from "./Message.jsx";
import MessageInput from "./MessageInput.jsx";
import MessageSkeleton from "./MessageSkeleton.jsx";
import { toast } from "react-toastify";
import {  useRecoilValue, useSetRecoilState } from "recoil";
import {  conversationsAtom, selectedConversationAtom } from "../atoms/messagesAtom.js";
import userAtom from "../atoms/userAtom.js";
import { useSocket } from "../context/SocketContext.jsx";
import messageSound from "../assets/sounds_notification.mp3"


const MessageContainer = () => {

  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [messages, setMessages] = useState([]);
  const currentUser = useRecoilValue(userAtom);
  const {socket} = useSocket();
  const setConversations = useSetRecoilState(conversationsAtom);
  const messageEndRef = useRef(null);


  useEffect(() => {
    socket.on("newMessage", (message) => {
      if(selectedConversation._id === message.conversationId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }

      if(!document.hasFocus()) {
        const sound = new Audio(messageSound);
        sound.play();
      }
      
      setConversations((prev) => {
        const updatedConversation = prev.map((conversation) => {
          if(conversation._id === message.conversationId) {
            return {
              ...conversation,
              lastMessage: {
                text: message.text,
                sender: message.sender,
              }
            }
          }
          return conversation
        })
        return updatedConversation
      })
    });
    return () => socket.off("newMessage");
  }, [socket, selectedConversation, setConversations])

  useEffect(() => {
    const lastMessageIsFromOther = messages.length && messages[messages.length-1].sender !== currentUser._id;
    if(lastMessageIsFromOther) {
      socket.emit("markMessagesAsSeen", {
        conversationId: selectedConversation._id,
        userId: selectedConversation.userId,
      })
    }
    socket.on("messagesSeen", ({conversationId}) => {
      if(selectedConversation._id === conversationId){
        setMessages(prev => {
          const updateMessages = prev.map(message => {
            if(!message.seen){
              return {
                ...message,
                seen: true
              }
            }
            return message
          })
          return updateMessages
        })
      }
    })
  }, [socket, currentUser._id, messages, selectedConversation])

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({behavior: "smooth"});
  }, [messages])

  useEffect(() => {
    const getMessages = async () => {
      setLoadingMessages(true);
      setMessages([]);
      try {
        if(selectedConversation.mock) return;
        const res = await fetch(`/api/messages/${selectedConversation.userId}`);
        const data = await res.json();
        if(data.error) {
          toast.error(data.error, {style: { background: "#d6436e", color: '#3c444c'}});
          return;
        }
        //console.log("messages",data)
        setMessages(data);

      } catch (error) {
        toast.error(error.message, {style: { background: "#d6436e", color: '#3c444c'}});
      } finally {
        setLoadingMessages(false);
      }
    }
    getMessages();
  }, [selectedConversation.userId, selectedConversation.mock])


  return (
    <div className="flex flex-col w-full">
        
        <div className="flex w-full h-12 items-center my-4 gap-2">
            <div className=" inline-block items-center w-16 h-16 min-w-16 min-h-16 rounded-full border-2 border-greenM1">    
              <img src={selectedConversation.userProfilePic || avatarSVG} alt="user" className="rounded-full w-[100%] h-[100%]"/>
            </div>
            <h2 className="text-lg ml-2 font-semibold">{selectedConversation.name}</h2>
        </div>
        <hr className="mt-4 border-greenM1"/>

        <div className="flex flex-col gap-4 my-4 overflow-auto">
            {loadingMessages && [...Array(7)].map((_, idx) => <MessageSkeleton key={idx}/>)}
                      
            
            {!loadingMessages && (
                messages.map((message) => (
                  <div className="flex flex-col px-1" key={message._id}
                  ref={messages.length -1 === messages.indexOf(message) ? messageEndRef : null}>
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