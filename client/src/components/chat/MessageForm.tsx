import { GoDotFill } from "react-icons/go"
import { FiSend } from "react-icons/fi";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { FaPaperclip } from "react-icons/fa";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import EmojiPicker from 'emoji-picker-react';
import { SocketContext } from "../../context/SocketContext";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useSearchParams } from "react-router-dom";
import { getApplicantsDetails } from "../../redux/actions/company/CompanyActions";
import { defaultProfile } from "../../config/constants";
import NoMessage from '../../assets/images/undraw_Push_notifications_re_t84m.png'
import { updateChatCompanyList, updateChatUserList } from "../../redux/reducers/chat/chatSlice";
const MessageForm = () => {
  const [message, setMessage] = useState<string>("");
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const { socket, currentRoom, onlineUsers, roomMessages, setRoomMessages } = useContext(SocketContext) || {}
  const [searchParams] = useSearchParams()

  const { user } = useSelector((state: RootState) => state.user)
  const { chatUserList } = useSelector((state: RootState) => state.chat)
  const { applicantData } = useSelector((state: RootState) => state.company)
  const messageBoxRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch<AppDispatch>()
  const chatUserId = searchParams.get("userId")

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowEmoji(false);
    socket?.emit("send-message", { roomId: currentRoom, roomCreater: user._id, senderId: user._id, message, roomJoiner: chatUserId });

    const updatedChatUserList = chatUserList?.map(chatUser => {
      if (chatUser.roomJoiner === chatUserId) {
        return { ...chatUser, lastMessage: message, lastMessageTime: new Date() };
      }
      return chatUser;
    }).sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime());


    dispatch(updateChatUserList(updatedChatUserList));

    setMessage("");
  };


  useEffect(() => {
    dispatch(getApplicantsDetails({ userId: chatUserId! }))
  }, [searchParams])



  useEffect(() => {
    socket?.off("room-messages").on("room-messages", (messages) => {
      setRoomMessages && setRoomMessages(messages)
    })
  }, [socket, message, currentRoom])

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [roomMessages]);
  useEffect(() => {
    if (user && socket) {
      socket.emit("new-user", (user._id));
    }
  }, [user, socket]);

  return (
    <>
      {
        currentRoom && chatUserId ? (
          <>
            <div className="realtive">
              <div className='sticky h-[66px] flex items-center bg-white z-50 -top-0 border-b-2'>
                <div className='ms-6'>
                  <div className="flex gap-x-3">
                    <img
                      className='w-10 rounded-full border-red-600 border'
                      src={typeof applicantData?.profilePic === 'string' ? applicantData.profilePic : defaultProfile}
                      alt=""
                    />
                    <div>
                      <h1 className="text-sm font-semibold text-gray-900">{applicantData?.userName}</h1>
                      <div className="flex">
                        <h1 className="font-semibold text-gray-800 text-xs">{onlineUsers?.some(users => users.userId === applicantData?._id) ? "online" : "offline"}</h1>
                        <span className={`text ${onlineUsers?.some(users => users.userId === applicantData?._id) ? "text-green-600" : "text-red-600"}  rounded-full`}><GoDotFill /></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-light-blue-50 h-[532px] border-b-2 border-gray-200 overflow-y-scroll scrollbar" ref={messageBoxRef}>
                {
                  currentRoom && roomMessages && roomMessages?.map((message, idx) => (
                    <>
                      <div key={idx} className="flex justify-between items-center sticky top-0 bg-light-blue-50">
                        <div className='border-b-2 w-4/12 border-gray-300'>
                        </div>
                        <h1 className="text-center px-4 py-3 bg-lightgreen text-white rounded-md mt-2">{format(new Date(message._id), 'EEEE ,MMMM dd yyyy')}</h1>
                        <div className='border-b-2 w-4/12  border-gray-300'>

                        </div>
                      </div>
                      {message?.messagesByDate?.map((msg, idx) => (
                        <>
                          <div key={idx} className={`flex mt-4  ${msg.senderId === user._id ? 'justify-end me-2' : 'justify-start'}`}>
                            <div className="">
                              <img className={`w-10 border border-red-600 rounded-full ${msg.senderId === user._id ? "hidden" : "block"}  h-10 ms-3`} src={msg.senderId === user._id ? "" : applicantData?.profilePic || ""} alt="" />
                              <div className={`px-3.5 py-2 max-w-xs ${msg.senderId === user._id ? 'me-1 bg-blue-600 rounded-s-xl rounded-b-2xl' : 'ms-12 bg-white rounded-e-xl rounded-b-xl'}`}>
                                <h1 className={`break-all  poppins text-sm font-semibold ${msg.senderId === user._id ? 'text-white' : ''}`}>{msg?.message}</h1>
                                <div className="flex justify-end">
                                  <div>
                                    <h1 className={`text-xs ${msg.senderId === user._id ? 'text-white' : 'text-black'}`}>{format(new Date(msg?.createdAt), "hh:mm a")}</h1>
                                    {/* <h1 className="text-xs text-white font-semibold">{message?.date && message?.date && format(new Date(), 'EEEE, MMMM d, yyyy')}</h1> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                    </>
                  ))
                }
              </div>
              <div className="absolute ms-10 -bottom-6 w-7/12">
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
          </>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <h1 className="poppins text-2xl font-bold mt-12">Select a Chat</h1>
              <img src={NoMessage} alt="" className="w-3/4 mt-20 ms-12" />
            </div>
          </>
        )
      }

    </>
  )
}

export default MessageForm