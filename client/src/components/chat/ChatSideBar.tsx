import { useSelector } from "react-redux"
import { SocketContext } from "../../context/SocketContext"
import { useContext, useEffect } from 'react'
import { GoDotFill } from "react-icons/go";
function ChatSideBar() {
  const user = useSelector((state: any) => state.user)
  const socketContext = useContext(SocketContext);

  const socket = socketContext?.socket;

  useEffect(() => {
    socket && socket.off('new-user').on('new-user', (payload) => {
      console.log("new user joined", payload)
    })
    socket?.emit("check", "data is emited from client while painting")
    if (user && socket) {
      // setCurrentRoom('general')
      // getRooms()
      socket.emit('join-room', 'general');
      socket.emit('new-user')
    }
    return (() => {
      socket?.off("check", () => {

      })
    }
    )
  }, [socket])

  // const getRooms = () => {
  //     fetch('http://127.0.0.1:3000/rooms').then((res) => res.json()).then((data) => setRooms(data))
  // }

  // const joinRoom = async(room:string, isPublic:boolean = true) => {
  //     if(!user) {
  //         return
  //     }
  //     socket.emit("join-room", room);
  //     setCurrentRoom(room);

  //     if(isPublic) {
  //         setPrivateMemberMsg({})
  //     }
  // }

  // const orderIds = (id1:string, id2:string) => {
  //     if(id1 > id2) {
  //         return id1 + "_" + id2
  //     } else {
  //         return id2 + "_" + id1
  //     }
  // }

  // const handlePrivateMemberMsg = (member: {_id:string,userName:"string",profilePic:string,status:string,}) => {
  //     setPrivateMemberMsg(member);
  //     const roomId:string = orderIds(user._id, member._id)
  //     joinRoom(roomId, false)
  // }
  return (
    <div className="border-e-red-200">
      <div className="border-b-2 ">
        <h1 className="text-2xl py-4  font-serif font-semibold ms-6">Messages</h1>
      </div>
      {/* <div>
        <input type="search" className="border mb-4 outline-none rounded-md py-2 px-7 ms-10 mt-4" placeholder="Search" />
      </div> */}
      <div className="ms-4 gap-x-2 flex mt-7 bg-blue-50 rounded-md me-3">
        <div className="py-2 ms-4"> 
        <img className="w-10 border border-red-600 rounded-full h-10 " src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs2/112692698/original/31a5d2469689575beee06ffcf4e9e76abab3abe2/logo-design-for-profile-picture-dessin-pour-photo-de-profil.png" alt="" />
        </div>
        <div className="flex gap-x-1 py-2 ">
            <div>
              <div className="flex">
              <h1 className="text-sm font-semibold text-gray-900">Jan Mayer </h1>
            <span className="text-xl text-green-600 rounded-full"><GoDotFill /></span>
            <h1 className="text-xs font-semibold poppins text-gray-700 mt-1 ms-8">12 mins ago</h1>
              </div>
              <h1 className="text-xs mt-1 text-gray-700">We want to invite you for a quick...</h1>
            </div>
          <div>
          </div>
        </div>
      </div>
      <div className="ms-4 gap-x-2 flex mt-2  rounded-md me-3">
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