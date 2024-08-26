import { useState } from "react";
import searchSVG from "../assets/search.svg";
//import chatSVG from "../assets/chat.svg";
import Spinner from "../components/Spinner";
import Conversation from "../components/Conversation";
import MessageContainer from "../components/MessageContainer";

const ChatPage = () => {

    const [loadingConversation] = useState(false);

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
                    <>
                    <Conversation/>
                    <Conversation/>
                    <Conversation/>
                    <Conversation/>
                    <Conversation/>
                    </>
                )}
            </div>


            <div className="flex w-[60%] justify-center p-4 bg-greenM4 rounded-lg border border-1 border-greenM1" id="chatMessage">
                {/*No chat selected
                <div className="flex flex-col justify-center items-center">
                    <img className="w-[5rem] h-[5rem]" src={chatSVG} alt="chat"/>
                    <p className="font-bold text-md">Select a chat to start messaging!</p>
                </div>*/}
                <MessageContainer/>
            </div>

        </div>

    </div>
  )
}

export default ChatPage