import { GoDotFill } from "react-icons/go"
import { IoSend } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { FaPaperclip } from "react-icons/fa";
import { FormEvent, useContext, useEffect, useState } from "react";
import EmojiPicker from 'emoji-picker-react';
import { SocketContext } from "../../context/SocketContext";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
const MessageForm = () => {
  const [message, setMessage] = useState<string>("");
  const [roomMessages, setRoomMessages] = useState<any>([])
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const { socket, currentRoom } = useContext(SocketContext) || {}


  const { user } = useSelector((state: RootState) => state.user)

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setShowEmoji(false)
    console.log(currentRoom, "currentRoom")
    socket?.emit("room-message", { message, currentRoom })
    console.log("🚀 ~ sendMessage ~ message:", message)
    setMessage("")
  }
  useEffect(() => {
    socket?.off("room-messages").on("room-messages", (messages) => {
      setRoomMessages(messages)
    })
  }, [socket, message, currentRoom])

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
      <div>
        {
          roomMessages?.map((message, idx) => (
            <div key={idx} className={`flex mt-3  ${message.senderId === user._id ? 'justify-end me-2' : 'justify-start'}`}>
              <div className="">
                <img className={`w-10 border border-red-600 rounded-full ${message.senderId === user._id ? "hidden" : "block"}  h-10 ms-3`} src={message.senderId === user._id ? "" : "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs2/112692698/original/31a5d2469689575beee06ffcf4e9e76abab3abe2/logo-design-for-profile-picture-dessin-pour-photo-de-profil.png"} alt="" />
                <div className={`bg-lightgreen text-black rounded-md px-3.5 py-2 max-w-xs ${message.senderId === user._id ? 'me-1' : 'ms-12'}`}>
                  <h1 className="break-all  text-white poppins text-sm">{message?.message}</h1>
                  <div className="flex justify-end">
                    <div>
                      <h1 className={`text-xs ${message.senderId === user._id ? 'me-4' : ''} text-white font-semibold`}>{message?.time}</h1>
                      {/* <h1 className="text-xs text-white font-semibold">{message?.date && message?.date && format(new Date(), 'EEEE, MMMM d, yyyy')}</h1> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className="absolute  ms-10 bottom-2 w-5/12">
        <form action="" onSubmit={sendMessage}>
          <FaPaperclip className="absolute left-2 text-gray-600 text-lg top-2.5 cursor-pointer" />
          <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" name="message" className="text-sm py-2 w-full outline-none text-gray-600 px-8 border border-gray-400 rounded-md" placeholder="Message..." />
          <MdOutlineEmojiEmotions onClick={() => setShowEmoji(!showEmoji)} className="text-2xl cursor-pointer text-gray-700 absolute right-14 bottom-2" />
          <EmojiPicker className="absolute bottom-10 ms-60 mt-28" height={"410px"} lazyLoadEmojis width={"350px"} open={showEmoji} reactionsDefaultOpen={false} onEmojiClick={(data) => setMessage((prev) => prev + data.emoji)} />
          <button className="bg-lightgreen px-3 pb-2  cursor-pointer py-2 w-min absolute right-0 bottom-0.5 rounded-lg">
            <IoSend className="  text-xl text-white" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default MessageForm