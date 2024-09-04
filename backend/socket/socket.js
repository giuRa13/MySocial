import {Server} from "socket.io";
import http from "http";
import express from "express";
import Message from "../models/messageModel.js";
import Conversation from "../models/conversationModel.js";

const app = express();
const server = http.createServer(app); //(able to handle http request)
const io = new Server(server,{ //(able to handle socket.io things)
    cors:{
        origin: "http://localhost:3000",
        methods:["GET", "POST"]
    }
}); //create Socket Server and combining it with the Http Server

export const getRecipientSocketId = (recipientId) => {
    return userSocketMap[recipientId];
}

const userSocketMap = {} // store the users Ids in the Server in a Map-> userId:socketId 

io.on("connection", (socket) => {   
    console.log("user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if(userId != "undefined") userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); //(array done by the keys of the Map[userId1, userId2, userId3...])

    socket.on("markMessagesAsSeen", async({conversationId, userId}) => {
        try {
            await Message.updateMany({conversationId:conversationId,seen:false}, {$set:{seen:true}});
            await Conversation.updateOne({_id:conversationId},{$set:{"lastMessage.seen":true}});
            io.to(userSocketMap[userId]).emit("messagesSeen", {conversationId});
        } catch (error) {
            console.log(error);
        }
    })

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});


export {io, server, app}
