const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server} = require("socket.io");
const { Socket } = require("dgram");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log("usre joined");
    });
    socket.on(`send_message`, (data)=> {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () =>{
        console.log("User Disconnected", socket.id);
    });
});

server.listen(4000, () => {
    console.log("server is runing");
});