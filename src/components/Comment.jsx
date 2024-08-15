import avatarSVG from "../assets/avatar.svg";

const Comment = ({reply}) => {

  return (
    <>
    <div className="flex gap-4 py-2 my-2 w-full">

        <img src={reply.userProfilePic || avatarSVG} alt="user avatar" className="flex w-12 h-12 rounded-full border-2 border-greenM1"/>
        
        <div className="w-full gap-1 flex flex-col">
            <div className="flex justify-between items-center w-full">
                <h3 className="text-md font-bold">{reply.username}</h3>
            </div>
            <p>{reply.text}</p>        
        </div>

    </div>
    <hr className="my-4 border-greenM1"/>
    </>
  )
}

export default Comment