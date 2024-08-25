import { useState } from "react";
import planeSVG from "../assets/plane.svg";

const MessageInput = () => {

    const [loading] = useState(false);

  return (
    <form className="flex w-full">
        <div className="w-full relative">
            <input type="text" className="w-full p-3.5 rounded-lg h-14 bg-whiteZinc dark:bg-blackM border-4 border-greenM1"
            placeholder="Send a Message"/>
            <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-4">
              {loading ?  <span className="loading loading-spinner text-greenM1"></span> 
               : <img src={planeSVG} className="w-8 h-8 hover:w-9 hover:h-9"/>}         
            </button>  
        </div>
    </form>
  )
}

export default MessageInput