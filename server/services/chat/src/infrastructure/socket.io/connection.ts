import { IncomingMessage, Server, ServerResponse, createServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { FRONTEND_BASE_URL } from "../../utils/constants/constants";

let io: SocketIOServer;
let onlineUsers: { userId: string; socketId: string }[] = [];

const connectSocketIo = (server: Server) => {
 if (!io) {
  io = new SocketIOServer(server, {
   cors: {
    origin: FRONTEND_BASE_URL,
   },
  });

  io.on("connection", (socket: Socket) => {
   socket.on("new-user", (userId: string) => {
    onlineUsers = onlineUsers.filter((user) => {
     return user.userId !== userId;
    });
    if (userId) {
     onlineUsers.push({ userId: userId, socketId: socket.id });
     io.emit("online-users", onlineUsers);
    }
   });

   socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("online-users", onlineUsers);
   });
  });
 }
};

export default connectSocketIo;
