import { useSelector } from "react-redux"
import { SocketContext } from "../../context/SocketContext"
import { useContext, useEffect } from 'react'
function ChatSideBar() {
    const user = useSelector((state: any) => state.user)
    const socketContext = useContext(SocketContext);
    
    const socket = socketContext?.socket;
    
    useEffect(() => {
      socket && socket.off('new-user').on('new-user', (payload) => {
        console.log("new user joined",payload)
      })
      socket?.emit("check","data is emited from client while painting")
        if (user && socket) {
            // setCurrentRoom('general')
            // getRooms()
            socket.emit('join-room', 'general');
            socket.emit('new-user')
        }
        return(() => {
          socket?.off("check",() => {

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
        <>
            <h1>hello sidebar</h1>
        </>
    )
}

export default ChatSideBar