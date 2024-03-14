import {  IncomingMessage, Server, ServerResponse, createServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

const server:  Server<typeof IncomingMessage, typeof ServerResponse> = createServer();
const io = new SocketIOServer(server, { 
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket: Socket) => {
  io.emit("new-user",`iam back with ${socket.id}`)
  socket.on("check", (payload) => {
    console.log(payload,"recived from frontend");
  })
});


export default server