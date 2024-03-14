import { GoDotFill } from "react-icons/go"

const MessageForm = () => {
  return (
    <div className='w-full border-b-2'>
      <div className='ms-6 my-3'>
        <div className="flex gap-x-3">
          <img className='w-10 rounded-full border-red-600 border' src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs2/112692698/original/31a5d2469689575beee06ffcf4e9e76abab3abe2/logo-design-for-profile-picture-dessin-pour-photo-de-profil.png" alt="" />
          <div>
            <h1 className="text-sm font-semibold text-gray-900">Jan Mayer</h1>
            <div className="flex">
              <h1 className="font-semibold text-gray-800 text-xs">online</h1>
              <span className="text text-green-600 rounded-full "><GoDotFill /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageForm