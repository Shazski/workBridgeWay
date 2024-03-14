import ChatSideBar from '../../components/chat/ChatSideBar'
import MessageForm from '../../components/chat/MessageForm'

const Chat = () => {
  return (
    <div className='w-full flex'>
      <div className='border-e-2 h-screen border w-3/12 md:w-5/12 lg:w-3/12'>
        <ChatSideBar />
      </div>
      <div className='w-full md:7/12 lg:w-7/12 border-e-2'>
        <MessageForm />
      </div>
    </div>
  )
}

export default Chat