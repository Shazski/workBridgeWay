import { useSelector } from "react-redux"
import { SocketContext } from "../../context/SocketContext"
import { useContext, useEffect } from 'react'
import { GoDotFill } from "react-icons/go";
import { RootState } from "../../redux/store";
function ChatSideBar() {
  const { user } = useSelector((state: RootState) => state.user)
  const { socket, currentRoom, setCurrentRoom } = useContext(SocketContext) || {}

  useEffect(() => {
    socket && socket.off('new-user').on('new-user', (payload) => {
      console.log("new user joined", payload)
    })
    if (user && socket) {
      socket.emit('join-room', 'general');
      socket.emit('new-user')
    }

  }, [socket])

  const joinRoom = (room: string) => {
    if (!user) return

    socket?.emit("join-room", room)
    setCurrentRoom && setCurrentRoom(room)
    console.log(currentRoom, "rooms data");
  }

  const createPrivateRoomId = (id1: string, id2: string) => {
    if (id1 > id2) {
      return id1 + "_" + id2
    } else {
      return id2 + "_" + id1
    }
  }

  const handlePrivateMessage = (applicant: { userId: string, userName: string, status: string }) => {
    const room = createPrivateRoomId(applicant.userId, user._id)
    joinRoom(room)
  }
  return (
    <div className="border-e-red-200">
      <div className="border-b-2 ">
        <h1 className="text-2xl py-4  font-serif font-semibold ms-6">Messages</h1>
      </div>
      {/* <div>
        <input type="search" className="border mb-4 outline-none rounded-md py-2 px-7 ms-10 mt-4" placeholder="Search" />
      </div> */}
      <div onClick={() => handlePrivateMessage({ userId: "65b7ba113da851157fa6bd1e", userName: "shazski", status: "online" })} className="ms-4 gap-x-2 md:flex mt-7 cursor-pointer bg-blue-50 rounded-md me-3">
        <div className="py-2 ms-4">
          <img className="w-10 border border-red-600 rounded-full h-10 " src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs2/112692698/original/31a5d2469689575beee06ffcf4e9e76abab3abe2/logo-design-for-profile-picture-dessin-pour-photo-de-profil.png" alt="" />
        </div>
        <div className="md:flex gap-x-1 py-2 ">
          <div>
            <div className="flex">
              <h1 className="text-sm font-semibold text-gray-900">Jan Mayer </h1>
              <span className="text-xl text-green-600 rounded-full"><GoDotFill /></span>
              <h1 className="text-xs font-semibold poppins hidden md:block text-gray-700 mt-1 md:ms-8">12 mins ago</h1>
            </div>
            <h1 className="text-xs mt-1 text-gray-700">We want to invite you for a quick...</h1>
          </div>
          <div>
          </div>
        </div>
      </div>
      <div className="ms-4 gap-x-2 flex mt-2 cursor-pointer rounded-md me-3">
        <div className="py-2 ms-4">
          <img className="w-10 border border-red-600 rounded-full h-10 " src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs2/112692698/original/31a5d2469689575beee06ffcf4e9e76abab3abe2/logo-design-for-profile-picture-dessin-pour-photo-de-profil.png" alt="" />
        </div>
        <div className="flex gap-x-1 py-2 ">
          <div>
            <div className="flex">
              <h1 className="text-sm font-semibold text-gray-900">Jan Mayer </h1>
              <span className="text-xl text-red-600 rounded-full"><GoDotFill /></span>
              <h1 className="text-xs font-semibold poppins text-gray-700 mt-1 ms-8">12 mins ago</h1>
            </div>
            <h1 className="text-xs mt-1 text-gray-700">We want to invite you for a quick...</h1>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatSideBar