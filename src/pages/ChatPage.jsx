import { useEffect, useState } from "react";
import searchSVG from "../assets/search.svg";
import chatSVG from "../assets/chat.svg";
import Spinner from "../components/Spinner";
import Conversation from "../components/Conversation";
import MessageContainer from "../components/MessageContainer";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import { conversationsAtom, selectedConversationAtom } from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtom";
import { useSocket } from "../context/SocketContext";

const ChatPage = () => {

    const [loadingConversation, setLoadingConversation] = useState(true);
    const [loadingUser, setLoadingUser] = useState(false);
    const [conversations, setConversations] = useRecoilState(conversationsAtom);
    const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom);
    const [searchText, setSearchText] = useState("");
    const currentUser = useRecoilValue(userAtom);
    const { onlineUsers} = useSocket(); // ,socket
        
    useEffect(() => {
        const getConversations = async() => {
            setSelectedConversation([]);
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

    const handleConversationSearch = async (e) => {
        e.preventDefault();
        setLoadingUser(true);
        setLoadingConversation(true);
        try {
            const res = await fetch(`/api/users/profile/${searchText}`);
            const searchedUser = await res.json();
            if(searchedUser.error) {
                toast.error(searchedUser.error, {style: { background: "#d6436e", color: '#3c444c'}});
                return;
            }

            const messagingYourself = searchedUser._id === currentUser._id;
            if(messagingYourself){
                toast.error("Cannot message Yourself", {style: { background: "#d6436e", color: '#3c444c'}});
                return;
            }

            const conversationExists = conversations.find(
                (conversation) => conversation.participants[0]._id === searchedUser._id);
            if(conversationExists){
                setSelectedConversation({
                    _id: conversationExists._id,
                    userId: searchedUser._id,
                    name: searchedUser.name,
                    username: searchedUser.username,
                    userProfilePic: searchedUser.profilePic,
                })
                return;
            }

            const mockConversation = {
                mock:true,
                lastMessage: {
                    text: "",
                    sender: "",
                },
                _id: Date.now(),
                participants: [
                    {
                        _id: searchedUser._id,
                        username: searchedUser.username,
                        name: searchedUser.name,
                        profilePic: searchedUser.profilePic,
                    }
                ]
            }
            setConversations((prevConvs) => [...prevConvs, mockConversation]);
            

        } catch (error) {
            toast.error(error.message, {style: { background: "#d6436e", color: '#3c444c'}});
        } finally {
            setLoadingConversation(false);
            setLoadingUser(false);
            setSearchText("");
        }
    }
 

  return (
    <div className="flex w-[60%] mx-auto pt-12 overflow-auto" id="chatPage">

        <div className="flex gap-6 w-full min-h-[750px] max-h-[750px]" id="chatPage2">

            <div className="flex flex-col w-[40%]  p-4 bg-greenM4 rounded-lg border border-1 border-greenM1" 
            id="chatConversation">
                <div className="flex w-full">
                    <form className="flex w-full items-center my-4 gap-4" onSubmit={handleConversationSearch}>
                        <input type="text" placeholder="Search..." className="w-full p-3.5 rounded-lg h-10 bg-whiteZinc dark:bg-blackM border-4 border-greenM1"
                        onChange={(e)=>setSearchText(e.target.value)}
                        value={searchText}/>
                        <button type="submit" className="rounded-lg p-1.5 bg-greenM1 hover:opacity-70"
                        >
                            {/*<img src={searchSVG} alt="search" />*/}
                            {loadingUser ?  <span className="loading loading-spinner text-grayM"></span> 
                            : <img src={searchSVG} />}  
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
                        <Conversation key={conversation._id} conversation={conversation}
                        isOnline={onlineUsers.includes(conversation.participants[0]._id)}/>
                    ))
                )}
            </div>

                     
            <div className="flex w-[60%] justify-center p-4 bg-greenM4 rounded-lg border border-1 border-greenM1" id="chatMessage">
                {/*No chat selected*/}  
                {!selectedConversation._id && (
                    <div className="flex flex-col justify-center items-center">
                        <img className="w-[5rem] h-[5rem]" src={chatSVG} alt="chat"/>
                        <p className="font-bold text-md">Select a chat to start messaging!</p>
                    </div>
                )}   
                
                {selectedConversation._id  && (
                    <MessageContainer/>
                )}               
            </div>

        </div>

    </div>
  )
}

export default ChatPage