import UserChatSideBar from "../../components/chat/UserChatSideBar"
import UserMessageForm from "../../components/chat/UserMessageForm"
import ProfileHeader from "../../components/user/ProfileHeader"

const Messages = () => {
  return (
    <div>
      <div className="sticky bg-white z-50 top-0 w-full">
        <ProfileHeader page="Messages" />
      </div>
      <div className='w-full flex'>
        <div className='border-e-2 h-[89vh] bg-white border w-4/12 md:w-5/12 lg:w-4/12'>
          <UserChatSideBar />
        </div>
        <div className='w-full  h-[82vh]   border-e-2'>
          <UserMessageForm />
        </div>
      </div>
    </div>
  )
}

export default Messages
