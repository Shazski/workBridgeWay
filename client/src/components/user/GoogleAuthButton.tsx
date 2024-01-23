import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../../firebase/firebaseConfig';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { googleAuth } from '../../redux/actions/user/userActions';

const GoogleAuthButton = () => {
    const dispatch = useDispatch<AppDispatch>()
    const handleOAuth = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            const userData = {
                userName: result?.user?.displayName,
                email: result?.user?.email,
                profilePic: result?.user?.photoURL
            }
            dispatch(googleAuth(userData))
        } catch (error) {
            console.error("Error in Oauth : ", error)
        }
    }
    return (
        <div className='w-28 mt-3 flex justify-center'>
            <div onClick={handleOAuth} className='flex border-lightgreen border hover:cursor-pointer px-2 py-1 rounded-sm'>
                <img className='w-8' src="http://pngimg.com/uploads/google/google_PNG19635.png" alt="" />
                <h1 className='pt-1'>Google</h1>
            </div>
        </div>
    )
}

export default GoogleAuthButton
