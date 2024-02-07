import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/actions/user/userActions';
import { AppDispatch } from '../../redux/store';

const WaitingPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    return (
        <div id='wrapper' className='fixed rounded-md inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
      <div className='w-[600px] bg-white rounded-md p-2'>
        <div className='bg-white p-2 text-black' >
            <h1>Your are Under review we will send you a mail after verification</h1>
            <button onClick={() => dispatch(logoutUser())} className='px-4 py-2 text-red-600 font-semibold bg-gray-200 rounded-md mt-4'>Logout</button>
        </div>
      </div>
    </div>
    )
}

export default WaitingPage