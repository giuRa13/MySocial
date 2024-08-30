import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app); //(able to handle http request)
const io = new Server(server,{ //(able to handle socket.io things)
    cors:{
        origin: "http://localhost:3000",
        methods:["GET", "POST"]
    }
}); //create Socket Server and combining it with the Http Server


io.on("connection", (socket) => {
    
    console.log("user connected", socket.id);

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    })
});


export {io, server, app}
