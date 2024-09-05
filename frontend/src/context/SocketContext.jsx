import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { io } from "socket.io-client";
import userAtom from "../atoms/userAtom";

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({children}) => {

    const [socket, setSocket] = useState(null);
    const user = useRecoilValue(userAtom);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        const socket = io("http://localhost:5000", {
            query:{
                userId: user?._id
            }
        });
        setSocket(socket);

        socket.on("getOnlineUsers", (users) => { //listen the "emit" from backend
            setOnlineUsers(users);
        });

        return () => socket && socket.close(); //disconnect when this Component unmounts

    }, [ user?._id]);
    console.log(onlineUsers, "Online Users");

    return (
        <SocketContext.Provider value={{socket, onlineUsers}}> 
            {children}
        </SocketContext.Provider>
        //can use {socket} inside the App(App.jsx)
        // calling the hook "useSocket"
    )
};