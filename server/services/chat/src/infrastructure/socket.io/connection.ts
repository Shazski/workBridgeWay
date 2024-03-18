import { IncomingMessage, Server, ServerResponse, createServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { FRONTEND_BASE_URL } from "../../utils/constants/constants";
import {
 createMessage,
 getLastMessagesFromRoom,
 updateLastMessage,
} from "../database/mongodb/repositories/chat.repo";
import { ObjectId } from "mongoose";

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

   socket.on("join-room", async (room: string) => {
    socket.join(room);
    const roomMessages = await getLastMessagesFromRoom(room);
    if (roomMessages) {
     roomMessages.map((msg) => console.log(msg?.messagesByDate));
     socket.emit("room-messages", roomMessages);
    }
   });

   socket.on(
    "send-message",
    async (messageData: {
     roomId: string;
     senderId: ObjectId;
     message: string;
     roomCreater: ObjectId;
     roomJoiner: ObjectId;
     messageType?: "text" | "image" | "audio" | "video" | "file";
    }) => {
     console.log("newMEssage", messageData);
     const message = await createMessage(messageData);
     const roomMessages = await getLastMessagesFromRoom(messageData?.roomId);
     const leastMessageUpdated = await updateLastMessage({
      roomCreater: messageData.roomCreater,
      roomJoiner: messageData.roomJoiner,
      message: messageData.message,
     });
     io.to(messageData.roomId).emit("room-messages", roomMessages);
    }
   );

   socket.on("logout-user", (userId: string) => {
    onlineUsers = onlineUsers.filter((user) => user.userId !== userId);
    io.emit("online-users", onlineUsers);
   });

   socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("online-users", onlineUsers);
   });
  });
 }
};

export default connectSocketIo;
