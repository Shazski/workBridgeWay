import React, { createContext, ReactNode, useState } from "react";
import io, { Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_REACT_APP_SOCKET_URL;

export interface SocketContextType {
  socket: Socket;
  message: string | null;
  setMessage: (message: string) => void;
  privateApplicantMsg: any
  setPrivateApplicantMsg: (any) => void;
  currentRoom: string;
  setCurrentRoom: (room: string) => void;
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
  const contextValue: SocketContextType = {
    socket,
    message,
    setMessage,
    privateApplicantMsg,
    setPrivateApplicantMsg,
    currentRoom,
    setCurrentRoom
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};
