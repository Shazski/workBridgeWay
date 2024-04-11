import { Server } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { FRONTEND_BASE_URL } from "../../utils/constants/constants";
import {
 createMessage,
 getCompanyMessageCount,
 getLastMessagesFromRoom,
 makeMessageReceiverSeen,
 updateLastMessage,
} from "../database/mongodb/repositories/chat.repo";
import { ObjectId } from "mongoose";

let io: SocketIOServer;
let onlineUsers: { userId: string; socketId: string }[] = [];
let userCurrentRoom: string = "";
let companyCurrentRoom: string = "";
let rooms: any = {};
const connectSocketIo = (server: Server) => {
 if (!io) {
  io = new SocketIOServer(server, {
   cors: {
    origin: FRONTEND_BASE_URL,
   },
  });

  io.on("connection", (socket: Socket) => {
   socket.emit("me", socket.id);

   socket.on("new-user", (userId: string) => {
    onlineUsers = onlineUsers.filter((user) => {
     return user.userId !== userId;
    });
    if (userId) {
     onlineUsers.push({ userId: userId, socketId: socket.id });
     io.emit("online-users", onlineUsers);
    }
   });

   socket.on("join-room", async (room: string, senderId: string) => {
    socket.join(room);
    await makeMessageReceiverSeen(room, senderId);
    const roomMessages = await getLastMessagesFromRoom(room);
    if (roomMessages) {
     socket.emit("room-messages", roomMessages);
    }
    io.emit("notification", roomMessages);
   });

   socket.on("room-joined", ({ roomId, id }) => {
    socket.join(roomId);

    if (!rooms[roomId]) {
     rooms[roomId] = [];
    }

    rooms[roomId].push(id);

    socket.emit(
     "user-list",
     rooms[roomId].filter((userId: any) => userId !== id)
    );

    io.to(roomId).emit("new-user-joined", id);

    socket.on("disconnect", () => {
     rooms[roomId] = rooms[roomId].filter((ids: any) => ids !== id);
    });
   });

   socket.on("get-company-message", async (companyId: string) => {
    const count = await getCompanyMessageCount(companyId);
    socket.emit("company-messages-count", count);
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
     replyMessage: string | string[];
     recieverSeen?: boolean;
    }) => {
     let messageTypeText = messageData.message;
     if (messageData.messageType === "image") {
      messageTypeText = "Image";
     } else if (messageData.messageType === "audio") {
      messageTypeText = "Audio";
     } else if (messageData.messageType === "video") {
      messageTypeText = "Video";
     } else if (messageData.messageType === "file") {
      messageTypeText = "Document";
     } else {
      messageTypeText = messageData?.message;
     }
     if (
      messageData.roomId === userCurrentRoom &&
      messageData.roomId === companyCurrentRoom
     ) {
      messageData.recieverSeen = true;
     }
     const message = await createMessage(messageData);
     updateLastMessage({
      roomCreater: messageData.roomCreater,
      roomJoiner: messageData.roomJoiner,
      message: messageTypeText,
     });

     const roomMessages = await getLastMessagesFromRoom(messageData?.roomId);
     io.to(messageData?.roomId).emit("room-messages", roomMessages);
     io.emit("notification", message);
    }
   );

   socket.on("userCurrentRoom", (room: string) => {
    userCurrentRoom = room;
   });
   socket.on("companyCurrentRoom", (room: string) => {
    companyCurrentRoom = room;
   });

   socket.on("typing", (senderId: ObjectId, roomId: string) => {
    io.emit("typing", senderId, roomId);
   });

   socket.on("typingStoped", (senderId: ObjectId, roomId: string) => {
    io.emit("typingStoped", senderId, roomId);
   });

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
