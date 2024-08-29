import { useRecoilValue } from "recoil";
import avatarSVG from "../assets/avatar.svg";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtom";


const Message = ({ownMessage, message}) => {

  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const user = useRecoilValue(userAtom);

  return (
    <>
    {ownMessage ? (
        <div className="flex justify-end my-2 gap-2">
            <p className="max-w-[300px] bg-greenM1 text-grayM py-2 px-4 rounded-lg" id="message-text">{message.text}</p>
            <div className=" avatar online inline-block items-center w-12 h-12 min-w-12 min-h-12 rounded-full border-2 border-greenM1">    
              <img src={user.profilePic || avatarSVG} alt="user" className="rounded-full w-[100%] h-[100%]"/>
            </div>
        </div>
    ) : (
        <div className="flex justify-start my-2 gap-2">
            <div className=" avatar online inline-block items-center w-12 h-12 min-w-12 min-h-12 rounded-full border-2 border-greenM1">    
              <img src={selectedConversation.userProfilePic || avatarSVG} alt="user" className="rounded-full w-[100%] h-[100%]"/>
            </div>
            <p className="max-w-[300px] bg-grayM py-2 px-4 rounded-lg" id="message-text">{message.text}</p>
        </div>
    )}

    </>
  )
}

export default Message