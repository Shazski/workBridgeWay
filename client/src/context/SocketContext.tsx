import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";
import { RootState } from "../redux/store";
import { TODO } from "../config/constants";
import Peer from "peerjs";

const SOCKET_URL = import.meta.env.VITE_REACT_APP_SOCKET_URL;
import { v4 as uuidV4 } from "uuid"

export interface SocketContextType {
  socket: Socket;
  me: Peer | null;
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
  stream: MediaStream | null
}
interface SocketProviderProps {
  children: ReactNode;
}

export const SocketContext = createContext<SocketContextType | null>(null);
export const socket = io(SOCKET_URL, { transports: ["websocket", "polling"] });


export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [me, setMe] = useState<Peer | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [currentRoom, setCurrentRoom] = useState<string>("");
  const [reRender, setReRender] = useState<boolean>(false);
  const [onlineUsers, setOnlineUsers] = useState<{ userId: string; socketId: string }[]>([]);
  const [roomMessages, setRoomMessages] = useState<TODO>([])
  const contextValue: SocketContextType = {
    socket,
    me,
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
    stream
  };
  const { user } = useSelector((state: RootState) => state.user)


  // useEffect(() => {
  //   const meId = uuidV4()
  //   const peer = new Peer(meId)
  //   setMe(peer)

  //   try {
  //     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
  //       setStream(stream)
  //     })
  //   } catch (error) {
  //     console.log("🚀 ~ file: SocketContext.tsx:69 ~ useEffect ~ error:", error)
  //   }
  // }, [])


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

  // useEffect(() => {
  //   if (!me) return
  //   if (!stream) return

  //   socket.on("user-joined", ({ peerId }) => {
  //     const call = me.call(peerId, stream)
  //     call.on("stream", (peerStream) => {

  //     })
  //   })

  //   me.on("call", (call) => {
  //     call.answer(stream)
  //   })
  // }, [me, stream])



  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};
