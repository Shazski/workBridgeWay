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

  io.on("connection", (socket:Socket) => {
    console.log("🚀 ~ io.on ~ socket:", socket.id)
  })
}
}

export default connectSocketIo
