import { useEffect, useState } from "react";
import searchSVG from "../assets/search.svg";
import chatSVG from "../assets/chat.svg";
import Spinner from "../components/Spinner";
import Conversation from "../components/Conversation";
import MessageContainer from "../components/MessageContainer";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { conversationsAtom, selectedConversationsAtom } from "../atoms/messagesAtom";

const ChatPage = () => {

    const [loadingConversation, setLoadingConversation] = useState(true);
    const [conversations, setConversations] = useRecoilState(conversationsAtom);
    const [selectedConversation] = useRecoilState(selectedConversationsAtom);

    useEffect(() => {
        const getConversations = async() => {
            try {
                const res = await fetch("/api/messages/conversations");
                const data = await res.json();
                if(data.error){
                    toast.error(data.error, {style: { background: "#d6436e", color: '#3c444c'}});
                    return;
                }
                console.log(data);
                setConversations(data);

            } catch (error) {
                toast.error(error.message, {style: { background: "#d6436e", color: '#3c444c'}});
            } finally {
                setLoadingConversation(false);
            }
        }
        getConversations();
    }, [setConversations])
 

  return (
    <div className="flex w-[60%] mx-auto pt-12 overflow-auto" id="chatPage">

        <div className="flex gap-6 w-full min-h-[750px] max-h-[750px]" id="chatPage2">

            <div className="flex flex-col w-[40%]  p-4 bg-greenM4 rounded-lg border border-1 border-greenM1" 
            id="chatConversation">
                <div className="flex w-full">
                    <form className="flex w-full items-center my-4 gap-4">
                        <input type="text" placeholder="Search..." className="w-full p-3.5 rounded-lg h-10 bg-whiteZinc dark:bg-blackM border-4 border-greenM1"/>
                        <button type="submit" className="rounded-lg p-1.5 bg-greenM1 hover:opacity-70">
                            <img src={searchSVG} alt="search" />
                        </button>
                    </form>
                </div>
                {loadingConversation && (
                    <div className="my-8">
                        <Spinner/>
                    </div>
                )}
                {!loadingConversation && (
                    conversations.map(conversation => (
                        <Conversation key={conversation._id} conversation={conversation}/>
                    ))
                )}
            </div>

                     
            <div className="flex w-[60%] justify-center p-4 bg-greenM4 rounded-lg border border-1 border-greenM1" id="chatMessage">

                {selectedConversation._id  && (
                    <MessageContainer/>
                )} 
                {/*No chat selected*/}  
                {!selectedConversation._id && (
                    <div className="flex flex-col justify-center items-center">
                        <img className="w-[5rem] h-[5rem]" src={chatSVG} alt="chat"/>
                        <p className="font-bold text-md">Select a chat to start messaging!</p>
                    </div>
                )}                 
            </div>

        </div>

    </div>
  )
}

export default ChatPage