import avatarSVG from "../assets/avatar.svg";


const Message = ({ownMessage}) => {
  return (
    <>
    {ownMessage ? (
        <div className="flex justify-end my-2 gap-2">
            <p className="max-w-[300px] bg-greenM1 text-grayM p-2 rounded-lg" id="message-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, qui.</p>
            <div className=" avatar online inline-block items-center w-12 h-12 min-w-12 min-h-12 rounded-full border-2 border-greenM1">    
              <img src={ avatarSVG} alt="user" className="rounded-full w-[100%] h-[100%]"/>
            </div>
        </div>
    ) : (
        <div className="flex justify-start my-2 gap-2">
            <div className=" avatar online inline-block items-center w-12 h-12 min-w-12 min-h-12 rounded-full border-2 border-greenM1">    
              <img src={ avatarSVG} alt="user" className="rounded-full w-[100%] h-[100%]"/>
            </div>
            <p className="max-w-[300px] bg-grayM p-2 rounded-lg" id="message-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, qui dolor sit amet consectetur adipisicing elit. Laudantium, qui </p>
        </div>
    )}

    </>
  )
}

export default Message