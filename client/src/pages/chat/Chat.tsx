import ChatSideBar from '../../components/chat/ChatSideBar'
import MessageForm from '../../components/chat/MessageForm'

const Chat = () => {
  return (
    <div className='w-full flex'>
      <div className='border-e-2 h-[89vh] bg-white border w-4/12 md:w-5/12 lg:w-4/12'>
        <ChatSideBar />
      </div>
      <div  className='w-full  h-[82vh]   border-e-2'>
        <MessageForm />
      </div>
    </div>
  )
}

export default Chat