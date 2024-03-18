import { useDispatch, useSelector } from "react-redux"
import { SocketContext } from "../../context/SocketContext"
import { useContext, useEffect, useState } from 'react'
import { GoDotFill } from "react-icons/go";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllChatUserList } from "../../redux/actions/chat/chatActions";
import { useNavigate, useSearchParams } from "react-router-dom";
function ChatSideBar() {
  const { user } = useSelector((state: RootState) => state.user)
  const { socket, currentRoom, setCurrentRoom, setOnlineUsers, onlineUsers } = useContext(SocketContext) || {}
  const [searchParams, _] = useSearchParams()
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getAllChatUserList(user._id))
  }, [])

  const { applicantData } = useSelector((state: RootState) => state.company)

  const navigate = useNavigate()

  const { chatUserList } = useSelector((state: RootState) => state.chat)

  // const joinRoom = (room: string) => {
  //   if (!user) return

  //   socket?.emit("join-room", room)
  //   setCurrentRoom && setCurrentRoom(room)
  //   console.log(currentRoom, "rooms data");
  // }
  useEffect(() => {
    socket?.on("online-users", (onlineUsers) => {
      setOnlineUsers && setOnlineUsers(onlineUsers)
    });
  }, [socket]);


  // const createPrivateRoomId = (id1: string, id2: string) => {
  //   if (id1 > id2) {
  //     return id1 + "_" + id2
  //   } else {
  //     return id2 + "_" + id1
  //   }
  // }

  // const handlePrivateMessage = (applicant: { userId: string, userName: string, status: string }) => {
  //   const room = createPrivateRoomId(applicant.userId, user._id)
  //   joinRoom(room)
  // }

  const handleProfileClick = (userId: string) => {
    navigate(`/company/messages?userId=${userId}`)
  }

  const chatUserId = searchParams.get("userId")

  return (
    <div className="border-e-red-200">
      <div className="border-b-2 ">
        <h1 className="text-2xl py-4  font-serif font-semibold ms-6">Messages</h1>
      </div>
      {/* <div>
        <input type="search" className="border mb-4 outline-none rounded-md py-2 px-7 ms-10 mt-4" placeholder="Search" />
      </div> */}
      {
        chatUserList?.map((chatUser, idx) => (
          <>
            <div onClick={() => handleProfileClick(chatUser?.roomJoiner)} key={idx} className={`ms-4 gap-x-2 md:flex mt-7 cursor-pointer rounded-e-xl rounded-b-xl me-3 ${chatUserId === chatUser?.roomJoiner ? 'bg-blue-50 ' : ''} `}>
              <div className="py-2 ms-4">
                <img className="w-10 border hidden md:flex border-red-600 rounded-full h-10 " src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs2/112692698/original/31a5d2469689575beee06ffcf4e9e76abab3abe2/logo-design-for-profile-picture-dessin-pour-photo-de-profil.png" alt="" />
              </div>
              <div className="md:flex gap-x-1 py-2 ">
                <div>
                  <div className="flex">
                    <h1 className="text-sm font-semibold text-gray-900">Jan Mayer </h1>
                    <span className={`text-xl rounded-full  ${onlineUsers && onlineUsers?.some((users) => users.userId === chatUser?.roomJoiner) ? 'text-green-600' : 'text-red-600'}`}><GoDotFill /></span>
                    <h1 className="text-xs font-semibold poppins hidden md:block text-gray-700 mt-1 md:ms-8">12 mins ago</h1>
                  </div>
                  <h1 className="text-xs mt-1 text-gray-700">We want to invite you for a quick...</h1>
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