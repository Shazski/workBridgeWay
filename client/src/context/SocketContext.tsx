import React, { createContext, ReactNode, useState } from "react";
import io, { Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_REACT_APP_SOCKET_URL;

interface SocketContextType {
  socket: Socket;
  message: string | null;
  setMessage: (message: string) => void;
}

export const SocketContext = createContext<SocketContextType | null>(null);
export const socket = io(SOCKET_URL, { transports: ["websocket", "polling"] });

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);

  const contextValue: SocketContextType = {
    socket,
    message,
    setMessage
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};
