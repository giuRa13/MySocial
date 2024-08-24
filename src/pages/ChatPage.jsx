import { useState } from "react";
import searchSVG from "../assets/search.svg";
import chatSVG from "../assets/chat.svg";
import Spinner from "../components/Spinner";
import Conversation from "../components/Conversation";

const ChatPage = () => {

    const [loadingConversation, setLoadingConversation] = useState(false);

  return (
    <div className="flex w-[60%] mx-auto pt-12" id="chatPage">

        <div className="flex gap-6 w-full min-h-[700px]" id="chatPage2">

            <div className="flex flex-col w-[40%]  p-4 dark:bg-greenM4 bg-greenM3 rounded-lg border border-1 border-greenM1" id="chatConversation">
                <div className="flex w-full">
                    <form className="flex w-full items-center gap-4">
                        <input type="text" placeholder="Search..." className="w-full p-3.5 rounded-lg h-10 bg-transparent bg-whiteZinc dark:bg-blackM border-4 border-greenM1"/>
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


            <div className="flex w-[60%] justify-center p-4 dark:bg-greenM4 bg-greenM3 rounded-lg border border-1 border-greenM1" id="chatMessage">
                {/*No chat selected*/}
                <div className="flex flex-col justify-center items-center">
                    <img className="w-[5rem] h-[5rem]" src={chatSVG} alt="chat"/>
                    <p className="font-bold text-md">Select a chat to start messaging!</p>
                </div>
            </div>

        </div>

    </div>
  )
}

export default ChatPage