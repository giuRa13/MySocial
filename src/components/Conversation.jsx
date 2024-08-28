import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import avatarSVG from "../assets/avatar.svg";
import { BsCheck2All } from "react-icons/bs";
import { selectedConversationsAtom } from "../atoms/messagesAtom";

const Conversation = ({conversation}) => {

    const user = conversation.participants[0];
    const currentUser = useRecoilValue(userAtom);
    const lastMessage = conversation.lastMessage;
    const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationsAtom);

    //console.log("HERE>>>", selectedConversation)
  return (
    <div className={`flex items-center p-2 cursor-pointer rounded-full my-2 border border-1 border-greenM1  hover:opacity-70
    ${selectedConversation?._id === conversation._id ? "bg-greenM1 text-grayM" : ""} `}
    onClick={() => setSelectedConversation({
        _id: conversation._id,
        userId: user._id,
        name: user.name,
        username: user.username,
        userProfilePic: user.profilePic,
    })}>
        <div className=" avatar online inline-block items-center w-16 h-16 min-w-16 min-h-16 rounded-full border-2 border-greenM1">    
              <img src={user.profilePic || avatarSVG} alt="user" className="rounded-full w-[100%] h-[100%] bg-greenM4"/>
        </div>
        <div className="flex flex-col">
            <div className="flex">
                <span className="font-semibold text-md ml-2" id="chatUsername">{user.name}</span>
                <span className="font-semibold text-md ml-2" id="chatUsername2">@{user.username}</span>
            </div>
            <div className="flex ml-2">
                <span className="flex items-center gap-1">
                    {currentUser._id === lastMessage.sender ? <BsCheck2All size={20} /> : ""}
                    {lastMessage.text.length > 20 ? lastMessage.text.substring(0,20) + "..." : lastMessage.text}
                </span>
            </div>
        </div>
    </div>
  )
}

export default Conversation