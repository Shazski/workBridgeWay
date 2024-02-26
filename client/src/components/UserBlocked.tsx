import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { makeUserNull } from '../redux/reducers/user/userSlice'
import toast from 'react-hot-toast'

const UserBlocked = ({ handleClose }) => {
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div className='backdrop:blur-sm w-96 h-32 justify-start flex flex-col items-center font-semibold poppins'>
      <div className="me-24">
        <h1 className='text-red-600 text-xl'>User Blocked</h1>
        <h1 className="">You have been blocked by Admin</h1>
      </div>
      <div className="me-24 mt-3">
        <button onClick={() => { dispatch(makeUserNull()), toast.dismiss(handleClose.id) }} className="px-4 py-1 border border-red-600 rounded-md text-lightgreen ">Ok</button>
      </div>
    </div>
  )
}

export default UserBlocked

