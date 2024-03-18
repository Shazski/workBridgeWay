import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";
import { RootState } from "../redux/store";

const SOCKET_URL = import.meta.env.VITE_REACT_APP_SOCKET_URL;

export interface SocketContextType {
  socket: Socket;
  message: string | null;
  setMessage: (message: string) => void;
  privateApplicantMsg: any
  setPrivateApplicantMsg: (any) => void;
  currentRoom: string;
  setCurrentRoom: (room: string) => void;
  onlineUsers: { userId: string; socketId: string }[];
  setOnlineUsers: (users: { userId: string; socketId: string }[]) => void;
  roomMessages: any[],
  setRoomMessages: (messages: any) => void
}

export const SocketContext = createContext<SocketContextType | null>(null);
export const socket = io(SOCKET_URL, { transports: ["websocket", "polling"] });

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [privateApplicantMsg, setPrivateApplicantMsg] = useState<any>(null);
  const [currentRoom, setCurrentRoom] = useState<string>("");
  const [onlineUsers, setOnlineUsers] = useState<{ userId: string; socketId: string }[]>([]);
  const [roomMessages, setRoomMessages] = useState<any>([])
  const contextValue: SocketContextType = {
    socket,
    message,
    setMessage,
    privateApplicantMsg,
    setPrivateApplicantMsg,
    currentRoom,
    setCurrentRoom,
    onlineUsers,
    setOnlineUsers,
    roomMessages,
    setRoomMessages
  };
  const { user } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (user && socket) {
      socket.emit("new-user", (user._id));
    }
  }, [user, socket]);

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};
