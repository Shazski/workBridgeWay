import { GoDotFill } from "react-icons/go"
import { FiSend } from "react-icons/fi";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { FaPaperclip } from "react-icons/fa";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import EmojiPicker from 'emoji-picker-react';
import { SocketContext } from "../../context/SocketContext";
import { format, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
const MessageForm = () => {
  const [message, setMessage] = useState<string>("");
  const [roomMessages, setRoomMessages] = useState<any>([])
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const { socket, currentRoom } = useContext(SocketContext) || {}


  const { user } = useSelector((state: RootState) => state.user)

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowEmoji(false);
    socket?.emit("room-message", { message, currentRoom, userId:user._id });
    setMessage("");
  };
  useEffect(() => {
    socket?.off("room-messages").on("room-messages", (messages) => {
      setRoomMessages(messages)
    })
  }, [socket, message, currentRoom])
  const messageBoxRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [roomMessages]);

  return (
    <div className="realtive">
      <div className='sticky h-[66px] flex items-center bg-white z-50 -top-0 border-b-2'>
        <div className='ms-6'>
          <div className="flex gap-x-3">
            <img className='w-10 rounded-full border-red-600 border' src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs2/112692698/original/31a5d2469689575beee06ffcf4e9e76abab3abe2/logo-design-for-profile-picture-dessin-pour-photo-de-profil.png" alt="" />
            <div>
              <h1 className="text-sm font-semibold text-gray-900">Jan Mayer</h1>
              <div className="flex">
                <h1 className="font-semibold text-gray-800 text-xs">online</h1>
                <span className="text text-green-600 rounded-full"><GoDotFill /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light-blue-50 h-[532px] border-b-2 border-gray-200 overflow-y-scroll scrollbar" ref={messageBoxRef}>
        {
          roomMessages?.map((message, idx) => (
            <div key={idx} className={`flex mt-4  ${message.senderId === user._id ? 'justify-end me-2' : 'justify-start'}`}>
              <div className="">
                <img className={`w-10 border border-red-600 rounded-full ${message.senderId === user._id ? "hidden" : "block"}  h-10 ms-3`} src={message.senderId === user._id ? "" : "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs2/112692698/original/31a5d2469689575beee06ffcf4e9e76abab3abe2/logo-design-for-profile-picture-dessin-pour-photo-de-profil.png"} alt="" />
                <div className={`px-3.5 py-2 max-w-xs ${message.senderId === user._id ? 'me-1 bg-blue-600 rounded-s-xl rounded-b-2xl' : 'ms-12 bg-white rounded-e-xl rounded-b-xl'}`}>
                  <h1 className={`break-all  poppins text-sm font-semibold ${message.senderId === user._id ? 'text-white' : ''}`}>{message?.message}</h1>
                  <div className="flex justify-end">
                    <div>
                      <h1 className={`text-xs ${message.senderId === user._id ? 'text-white' : 'text-black'}`}>{format(new Date(message?.time),"hh:mm a")}</h1>
                      {/* <h1 className="text-xs text-white font-semibold">{message?.date && message?.date && format(new Date(), 'EEEE, MMMM d, yyyy')}</h1> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className="absolute ms-10 bottom-2 w-7/12">
        <EmojiPicker className=" bottom-2 ms-[460px]" height={"410px"} lazyLoadEmojis width={"350px"} open={showEmoji} reactionsDefaultOpen={false} onEmojiClick={(data) => setMessage((prev) => prev + data.emoji)} />
        <form action="" onSubmit={sendMessage}>
          <div className="flex gap-x-3">
            <FaPaperclip className="absolute left-2 bottom-32 text-gray-600 text-lg top-2.5 cursor-pointer" />
            <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" name="message" className="text-sm bg-blue-50 py-2 w-full outline-none text-gray-600 px-8 border border-gray-400 rounded-xl" placeholder="Message..." />
            <MdOutlineEmojiEmotions onClick={() => setShowEmoji(!showEmoji)} className="text-2xl cursor-pointer text-gray-700 absolute right-16 bottom-2" />
            <button className={`bg-lightgreen px-3 pb-2  cursor-pointer py-2 w-min rounded-lg disabled:opacity-70 disabled:cursor-not-allowed`} disabled={message === ""}>
              <FiSend className="  text-xl text-white me-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MessageForm