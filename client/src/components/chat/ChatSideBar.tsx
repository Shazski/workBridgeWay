import { useDispatch, useSelector } from "react-redux"
import { SocketContext } from "../../context/SocketContext"
import { useContext, useEffect, useState } from 'react'
import { GoDotFill } from "react-icons/go";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllChatUserList, getAllUnreadMessages } from "../../redux/actions/chat/chatActions";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getChatUserDetailsByIds } from "../../redux/actions/company/CompanyActions";
function ChatSideBar() {
  const { user } = useSelector((state: RootState) => state.user)
  const { socket, currentRoom, setCurrentRoom, roomMessages, setOnlineUsers, onlineUsers, reRender, } = useContext(SocketContext) || {}
  const [searchParams, _] = useSearchParams()
  const [typingCurrentRoom, setTypingCurrentRoom] = useState<string>("");
  const [typingUserId, setTypingUserId] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>()
  const { chatUserList, userFullDetails, unreadMessages } = useSelector((state: RootState) => state.chat)
  useEffect(() => {
    dispatch(getAllChatUserList(user._id))
  }, [roomMessages, user._id, dispatch, reRender])

  const navigate = useNavigate()


  const chatUserId = searchParams.get("userId")

  useEffect(() => {
    socket?.on("online-users", (onlineUsers) => {
      setOnlineUsers && setOnlineUsers(onlineUsers)
    });
  }, [socket]);


  const joinRoom = (room: string) => {
    if (!user) return
    socket?.emit("join-room", room)
    socket?.emit("companyCurrentRoom", room)
    setCurrentRoom && setCurrentRoom(room)
  }

  const createPrivateRoomId = (id1: string, id2: string) => {
    if (id1 > id2) {
      return id1 + "_" + id2
    } else {
      return id2 + "_" + id1
    }
  }
  const unreadMessageCounts: { [roomId: string]: number } = {};

  chatUserList?.forEach((list) => {
    const countofRoom = unreadMessages?.filter((room) => room.senderId !== user._id && createPrivateRoomId(list?.roomCreater, list?.roomJoiner) === room.roomId).length
    unreadMessageCounts[createPrivateRoomId(list.roomCreater, list.roomJoiner)] = countofRoom || 0
  })

  const handlePrivateMessage = (userId) => {
    const room = createPrivateRoomId(userId, user._id)
    joinRoom(room)
  }

  const handleProfileClick = (userId: string) => {
    handlePrivateMessage(userId)
    navigate(`/company/messages?userId=${userId}`)
  }

  useEffect(() => {
    const userIds = chatUserList?.map(user => user.roomJoiner)
    if (userIds && userIds.length > 0)
      dispatch(getChatUserDetailsByIds(userIds!))
  }, [chatUserList])

  const getTimeAgo = (timestamp) => {

    const now = new Date().getTime();
    const diffMs = now - new Date(timestamp).getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
    } else if (diffHours > 0) {
      return diffHours === 1 ? '1 hour ago' : `${diffHours} hr ago`;
    } else if (diffMinutes > 0) {
      return diffMinutes === 1 ? '1 minute ago' : `${diffMinutes} min ago`;
    } else if (timestamp === undefined) {
      return '';
    } else {
      return 'Just now'
    }
  };
  useEffect(() => {
    dispatch(getAllUnreadMessages())
  }, [reRender, chatUserList])

  useEffect(() => {
    socket?.on("typing", (senderId, roomId) => {
      setTypingUserId(senderId)
      setTypingCurrentRoom(roomId)
    })
  }, [socket])

  useEffect(() => {
    socket?.on("typingStoped", () => {
      setTypingUserId("")
      setTypingCurrentRoom("")
    })
  }, [socket])


  return (
    <div className="border-e-red-200 ">
      <div className="border-b-2 shadow-lg">
        <h1 className="text-2xl py-4  font-serif font-semibold ms-6">Messages</h1>
      </div>
      {/* <div>
        <input type="search" className="border mb-4 outline-none rounded-md py-2 px-7 ms-10 mt-4" placeholder="Search" />
      </div> */}
      {
        userFullDetails && chatUserList && chatUserList.slice()
          .sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime())?.map((chatUser, idx) => (
            <>
              <div onClick={() => handleProfileClick(chatUser?.roomJoiner)} key={idx} className={`ms-4 gap-x-2 md:flex mt-7 cursor-pointer rounded-e-xl rounded-b-xl me-3 ${currentRoom && chatUserId === chatUser?.roomJoiner ? 'bg-blue-50 ' : ''} `}>
                <div className="py-2 ms-4">
                  <img
                    className="w-10 border hidden md:flex rounded-full h-10"
                    src={typeof userFullDetails.find((user) => user._id === chatUser.roomJoiner)?.profilePic === 'string' ? userFullDetails.find((user) => user._id === chatUser.roomJoiner)?.profilePic : undefined}
                    alt=""
                  />
                </div>
                <div className="md:flex gap-x-1 py-2 ">
                  <div>
                    <div className="flex">
                      <h1 className="text-sm font-semibold text-gray-900">{userFullDetails?.find((user) => user?._id === chatUser?.roomJoiner)?.userName || "unknown"} </h1>
                      <span className={`text-xl rounded-full  ${onlineUsers && onlineUsers?.some((users) => users.userId === chatUser?.roomJoiner) ? 'text-green-600' : 'text-red-600'}`}><GoDotFill /></span>
                      <h1 className="text-xs  font-semibold text-end poppins  text-gray-700  mt-1 ">{getTimeAgo(chatUser?.lastMessageTime)}</h1>
                      {
                        unreadMessageCounts[createPrivateRoomId(chatUser?.roomCreater, chatUser?.roomJoiner)] > 0 &&
                        <h1 className="text-xs font-semibold text-end poppins bg-lightgreen rounded-full text-white px-2 py-0.5 ms-6 mt-1">
                          {unreadMessageCounts && unreadMessageCounts[createPrivateRoomId(chatUser?.roomCreater, chatUser?.roomJoiner)] || 0}
                        </h1>
                      }
                    </div>
                    <h1 className="text-xs mt-1 font-semibold  text-gray-700">
                      {
                        typingUserId.length > 0 && typingUserId !== user._id && typingCurrentRoom === createPrivateRoomId(chatUser.roomCreater, chatUser.roomJoiner) ?
                          <>
                            <h1>Typing...</h1>
                          </> : <>
                            {chatUser?.lastMessage && chatUser?.lastMessage.length > 20
                              ? chatUser?.lastMessage.substring(0, 15) + '...'
                              : chatUser?.lastMessage || '....'}
                          </>
                      }
                    </h1>
                  </div>
                  <div>
                  </div>
                </div>
              </div>
            </>
          ))
      }

    </div>
  )
}

export default ChatSideBar