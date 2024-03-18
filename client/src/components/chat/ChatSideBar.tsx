import { useDispatch, useSelector } from "react-redux"
import { SocketContext } from "../../context/SocketContext"
import { useContext, useEffect } from 'react'
import { GoDotFill } from "react-icons/go";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllChatUserList } from "../../redux/actions/chat/chatActions";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getChatUserDetailsByIds } from "../../redux/actions/company/CompanyActions";
function ChatSideBar() {
  const { user } = useSelector((state: RootState) => state.user)
  const { socket, currentRoom, setCurrentRoom, setOnlineUsers, onlineUsers } = useContext(SocketContext) || {}
  const [searchParams, _] = useSearchParams()
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getAllChatUserList(user._id))
  }, [])

  const navigate = useNavigate()

  const { chatUserList, userFullDetails } = useSelector((state: RootState) => state.chat)

  const chatUserId = searchParams.get("userId")

  useEffect(() => {
    socket?.on("online-users", (onlineUsers) => {
      setOnlineUsers && setOnlineUsers(onlineUsers)
    });
  }, [socket]);


  const joinRoom = (room: string) => {
    if (!user) return
    socket?.emit("join-room", room)
    setCurrentRoom && setCurrentRoom(room)
  }



  const createPrivateRoomId = (id1: string, id2: string) => {
    if (id1 > id2) {
      return id1 + "_" + id2
    } else {
      return id2 + "_" + id1
    }
  }

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


  return (
    <div className="border-e-red-200">
      <div className="border-b-2 ">
        <h1 className="text-2xl py-4  font-serif font-semibold ms-6">Messages</h1>
      </div>
      {/* <div>
        <input type="search" className="border mb-4 outline-none rounded-md py-2 px-7 ms-10 mt-4" placeholder="Search" />
      </div> */}
      {
        userFullDetails && chatUserList && chatUserList.slice()
          .sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime())?.map((chatUser, idx) => (
            <>
              <div onClick={() => handleProfileClick(chatUser?.roomJoiner)} key={idx} className={`ms-4 gap-x-2 md:flex mt-7 cursor-pointer rounded-e-xl rounded-b-xl me-3 ${ currentRoom && chatUserId === chatUser?.roomJoiner ? 'bg-blue-50 ' : ''} `}>
                <div className="py-2 ms-4">
                  <img
                    className="w-10 border hidden md:flex border-red-600 rounded-full h-10 "
                    src={userFullDetails.find((user) => user._id === chatUser.roomJoiner)?.profilePic ?? ""}
                    alt=""
                  />
                </div>
                <div className="md:flex gap-x-1 py-2 ">
                  <div>
                    <div className="flex">
                      <h1 className="text-sm font-semibold text-gray-900">{userFullDetails?.find((user) => user?._id === chatUser?.roomJoiner)?.userName || "unknown"} </h1>
                      <span className={`text-xl rounded-full  ${onlineUsers && onlineUsers?.some((users) => users.userId === chatUser?.roomJoiner) ? 'text-green-600' : 'text-red-600'}`}><GoDotFill /></span>
                      <h1 className="text-xs  font-semibold text-end poppins  text-gray-700  mt-1 ">{getTimeAgo(chatUser?.lastMessageTime)}</h1>
                    </div>
                    <h1 className="text-xs mt-1 font-semibold  text-gray-700">
                      {chatUser?.lastMessage && chatUser?.lastMessage.length > 20
                        ? chatUser?.lastMessage.substring(0, 15) + '...'
                        : chatUser?.lastMessage || '....'}
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