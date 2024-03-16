import { IncomingMessage, Server, ServerResponse, createServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

const server: Server<typeof IncomingMessage, typeof ServerResponse> =
 createServer();
const io = new SocketIOServer(server, {
 cors: {
  origin: "http://127.0.0.1:5173",
  methods: ["GET", "POST"],
  credentials: true,
 },
});

io.on("connection", (socket: Socket) => {
 let roomMessages = [
  {
   message: "hello dear",
   time: new Date(),
   date: "15-03-2024",
   senderId: "65b7ba113da851157fa6bd1e",
  },
  {
   message: "hello dear",
   time: new Date(),
   date: "15-03-2024",
   senderId: "65b7ba5dc990db9a68998bae",
  },
 ];
 socket.on("join-room", async (room: string) => {
  socket.join(room);
  socket.emit("room-messages", roomMessages);
 });
 socket.on(
  "room-message",
  (messageData: { message: string; currentRoom: string; userId: string }) => {
   console.log("🚀 ~ socket.on ~ room:", messageData.currentRoom);
   console.log(messageData.message, "messageData");
   roomMessages.push({
    message: messageData.message,
    time: new Date(),
    date: "15-03-2024",
    senderId: messageData.userId,
   });
   io.to(messageData?.currentRoom).emit("room-messages", roomMessages);
  }
 );
});

export default server;
