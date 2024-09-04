import { useRecoilValue } from "recoil";
import avatarSVG from "../assets/avatar.svg";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtom";
import { BsCheck2All } from "react-icons/bs";
import { useState } from "react";


const Message = ({ownMessage, message}) => {

  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const user = useRecoilValue(userAtom);
  const [imgLoaded, setImgLoaded] = useState(false); //for scroll img to bottom

  return (
    <>
    {ownMessage ? (
        <div className="flex justify-end my-2 gap-2">
          {message.text &&(
          <div className="flex max-w-[300px] bg-greenM1 text-grayM py-2 px-4 rounded-lg" id="message-text">
            <p className="justify-start">{message.text}</p>
            <span className={`justify-end ml-2 mt-auto ${message.seen ? "text-blue-500" : "text-gray-500"}`}><BsCheck2All size={20} /></span>
          </div>
        )}
        {message.img && !imgLoaded && (
          <div className="flex mt-5 w-[250px]">
            <img alt="img" className="rounded-md" src={message.img} hidden onLoad={() => setImgLoaded(true)}/>
            <div className='skeleton w-[250px] h-[200px] bg-grayM rounded-md'></div>
            <span className={`justify-end ml-2 mt-auto ${message.seen ? "text-blue-500" : "text-gray-500"}`}><BsCheck2All size={20} /></span>
          </div>
        )}
        {message.img && imgLoaded && (
          <div className="flex mt-5 w-[250px]">
            <img alt="img" className="rounded-md" src={message.img} />
            <span className={`justify-end ml-2 mt-auto ${message.seen ? "text-blue-500" : "text-gray-500"}`}><BsCheck2All size={20} /></span>
          </div>
        )}
          <div className="inline-block items-center w-12 h-12 min-w-12 min-h-12 rounded-full border-2 border-greenM1">    
            <img src={user.profilePic || avatarSVG} alt="user" className="rounded-full w-[100%] h-[100%]"/>
          </div>
        </div>
    ) : (
        <div className="flex justify-start my-2 gap-2">
            <div className="inline-block items-center w-12 h-12 min-w-12 min-h-12 rounded-full border-2 border-greenM1">    
              <img src={selectedConversation.userProfilePic || avatarSVG} alt="user" className="rounded-full w-[100%] h-[100%]"/>
            </div>
            {message.text && (
            <div className="flex max-w-[300px] bg-grayM py-2 px-4 rounded-lg" id="message-text">
              <p className="">{message.text}</p>
            </div>     
            )}  
            {message.img && !imgLoaded && (
              <div className="flex mt-5 w-[250px]">
                <img alt="img" className="rounded-md" src={message.img} hidden onLoad={() => setImgLoaded(true)}/>
                <div className='skeleton w-[250px] h-[200px] bg-grayM rounded-md'></div>
              </div>
            )}
            {message.img && imgLoaded && (
              <div className="flex mt-5 w-[250px]">
                <img alt="img" className="rounded-md" src={message.img} />
              </div>
            )}
        </div>
    )}

    </>
  )
}

export default Message

/*
            <div className="flex max-w-[300px] bg-grayM py-2 px-4 rounded-lg" id="message-text">
              <p className="justify-start">{message.text}</p>
              <span className={`justify-end ml-2 mt-auto ${message.seen ? "text-blue-400" : "text-gray-500"}`}><BsCheck2All size={20} /></span>
            </div>
 */