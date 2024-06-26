import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";
import { RootState } from "../redux/store";
import { TODO } from "../config/constants";

const SOCKET_URL = "https://workbridgeway.webhobecoshop.shop";

export interface SocketContextType {
  socket: Socket;
  message: string | null;
  setMessage: (message: string) => void;
  currentRoom: string;
  setCurrentRoom: (room: string) => void;
  reRender: TODO;
  setReRender: (TODO) => void;
  onlineUsers: { userId: string; socketId: string }[];
  setOnlineUsers: (users: { userId: string; socketId: string }[]) => void;
  roomMessages: TODO[],
  setRoomMessages: (messages: TODO) => void;
}
interface SocketProviderProps {
  children: ReactNode;
}

export const SocketContext = createContext<SocketContextType | null>(null);
export const socket = io(SOCKET_URL, { transports: ["websocket", "polling"] });


export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [currentRoom, setCurrentRoom] = useState<string>("");
  const [reRender, setReRender] = useState<boolean>(false);
  const [onlineUsers, setOnlineUsers] = useState<{ userId: string; socketId: string }[]>([]);
  const [roomMessages, setRoomMessages] = useState<TODO>([])
  const contextValue: SocketContextType = {
    socket,
    message,
    setMessage,
    currentRoom,
    setCurrentRoom,
    onlineUsers,
    setOnlineUsers,
    roomMessages,
    setRoomMessages,
    reRender,
    setReRender,
  };
  const { user } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (user && socket) {
      socket.emit("new-user", (user._id));
    }
  }, [user, socket]);

  useEffect(() => {
    if (user && socket) {
      socket.on("notification", (message) => {
        setReRender(message)
      });
    }
  }, [user, socket]);


  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};
