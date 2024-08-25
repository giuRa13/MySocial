import avatarSVG from "../assets/avatar.svg";
import Message from "./Message";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./MessageSkeleton";


const MessageContainer = () => {
  return (
    <div className="flex flex-col w-full">
        
        <div className="flex w-full h-12 items-center my-4 gap-2">
            <div className=" avatar online inline-block items-center w-16 h-16 min-w-16 min-h-16 rounded-full border-2 border-greenM1">    
              <img src={ avatarSVG} alt="user" className="rounded-full w-[100%] h-[100%]"/>
            </div>
            <h2 className="text-lg ml-2 font-semibold">User Full Name</h2>
        </div>
        <hr className="mt-4 border-greenM1"/>

        <div className="flex flex-col gap-4 my-4 overflow-auto">
            {false && [...Array(7)].map((_, idx) => <MessageSkeleton key={idx}/>)}
            
            <div className="flex flex-col px-2">
                <Message ownMessage={true}/>
                <Message ownMessage={false}/>
                <Message ownMessage={true}/>
                <Message ownMessage={false}/>
                <Message ownMessage={false}/>
                <Message ownMessage={true}/>
            </div>
        </div>
        
        <MessageInput/>
    </div>
  )
}

export default MessageContainer