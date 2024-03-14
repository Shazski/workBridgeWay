import ChatSideBar from '../../components/chat/ChatSideBar'

const Chat = () => {
  return (
    <div className='w-full'>
      <div className='border-e-2 h-screen border md:w-5/12 lg:w-3/12'>
        <ChatSideBar />
        </div>
    </div>
  )
}

export default Chat