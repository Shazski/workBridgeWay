import { useDispatch, useSelector } from "react-redux"
import { SocketContext } from "../../context/SocketContext"
import { useContext, useEffect } from 'react'
import { GoDotFill } from "react-icons/go";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllChatCompanyList } from "../../redux/actions/chat/chatActions";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getChatCompanyDetailsByIds } from "../../redux/actions/user/userActions";
function UserChatSideBar() {
  const { user } = useSelector((state: RootState) => state.user)

  const [searchParams, _] = useSearchParams()

  const { socket, currentRoom, setCurrentRoom, setOnlineUsers, onlineUsers, roomMessages, reRender } = useContext(SocketContext) || {}

  const dispatch = useDispatch<AppDispatch>()

  const chatCompanyId = searchParams.get("companyId")
  const { chatCompanyList, companyFullDetails } = useSelector((state: RootState) => state.chat)

  useEffect(() => {
    dispatch(getAllChatCompanyList(user._id))
    console.log(reRender, "reRenderdata===>>>>")
  }, [roomMessages, reRender])

  const navigate = useNavigate()


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
    navigate(`/user/messages?companyId=${userId}`)
  }
  useEffect(() => {
    socket && socket.on("online-users", (onlineUsers) => {
      setOnlineUsers && setOnlineUsers(onlineUsers)
    })
  }, [socket])

  useEffect(() => {
    const companyIds = chatCompanyList?.map(user => user.roomCreater)
    if (companyIds.length > 0)
      dispatch(getChatCompanyDetailsByIds(companyIds!))
  }, [chatCompanyList])


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
    <div className="border-t-2 mt-16">
      {/* <div>
        <input type="search" className="border mb-4 outline-none rounded-md py-2 px-7 ms-10 mt-4" placeholder="Search" />
      </div> */}
      {
        companyFullDetails && chatCompanyList.slice()
          .sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime())?.map((chatUser, idx) => (
            <>
              <div key={idx} onClick={() => handleProfileClick(chatUser?.roomCreater)} className={`ms-4 gap-x-2 md:flex mt-3 cursor-pointer rounded-e-xl rounded-b-xl me-3 ${currentRoom && chatCompanyId === chatUser?.roomCreater ? 'bg-blue-50 ' : ''} `}>
                <div className="py-2 ms-4 hidden md:flex">
                  <img className="w-10 border border-red-600 rounded-full h-10 " src={companyFullDetails?.find(details => details._id === chatUser.roomCreater)?.companyLogo ?? ""} alt={companyFullDetails?.find(details => details._id === chatUser.roomCreater)?.name} />
                </div>
                <div className="md:flex gap-x-1 py-2 ">
                  <div>
                    <div className="flex w-full ">
                      <h1 className="text-sm font-semibold text-gray-900">{companyFullDetails?.find(details => details._id === chatUser.roomCreater)?.name}</h1>
                      <span className={`text-xl rounded-full  ${onlineUsers && onlineUsers?.some((users) => users.userId === chatUser?.roomCreater) ? 'text-green-600' : 'text-red-600'}`}><GoDotFill /></span>
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

export default UserChatSideBar