import { FC, useEffect } from 'react'
import SignUpNavbar from '../../components/user/SignUpNavbar'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form } from "formik"
import SignUpInputField from "../../components/user/SignUpInputField"
import { validationSchemaSignUp } from '../../validations/ValidationSchema'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { IUserSelector } from '../../interface/IuserSlice'
import { googleAuth, userSignUp } from '../../redux/actions/user/userActions'
import { ToastContainer, toast } from 'react-toastify'
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { app } from '../../firebase/firebaseConfig'


const SignUp: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { user, loading, error } = useSelector((state: IUserSelector) => state.user);
    const navigate = useNavigate()

    useEffect(() => {
        console.log(user)
        if (user?.email) {
            navigate('/otp')
        }
    }, [user, navigate]);

    const handleOAuth = async () => {
        try {
            console.log("hello auth")
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
        <div className='flex '>
            <div className='hidden md:flex w-5/12'>
                <SignUpNavbar />
            </div>
            <div className='w-11/12 md:w-6/12'>
                <div>
                    <h1 className='text-end mt-5 font-semibold'>Have an account?<Link to='/login' className='text-lightgreen font-bold ps-2'>Sign in!</Link></h1>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='text-center mt-12'>
                        <h1 className='text-3xl font-bold'>Get Started With WorkBridgeWay</h1>
                        <h1 className='text-xs text-gray-600'>Getting started is Easy</h1>
                    </div>
                    <div className='w-28 mt-3 flex justify-center'>
                        <div onClick={handleOAuth} className='flex border-lightgreen border hover:cursor-pointer px-2 py-1 rounded-sm'>
                            <img className='w-8' src="http://pngimg.com/uploads/google/google_PNG19635.png" alt="" />
                            <h1 className='pt-1'>Google</h1>
                        </div>
                    </div>
                    <div className="flex items-center justify-center text-center">
                        <div className="pt-5 border-b border-gray-500 w-8 mx-2"></div>
                        <h1 className='text-center pt-5 text-xs'>Or continue with</h1>
                        <div className="pt-5 border-b border-gray-500 w-8 mx-2"></div>
                    </div>
                </div>
                {
                    error && <h1 className='text-red-600 font-semibold text-center pt-5'>{error}</h1>
                }
                <Formik
                    initialValues={{ userName: "", email: "", password: "", phone: "", confirmPassword: "" }}
                    validationSchema={validationSchemaSignUp}
                    onSubmit={async (values, { resetForm }) => {
                        console.log(values, "my values after submitting the form")
                        const { confirmPassword, ...restValues } = values
                        console.log(confirmPassword)
                        const userData = await dispatch(userSignUp(restValues))
                        if (userData.payload.success) {
                            toast.success("otp sent successfully")
                            navigate('/otp')
                        }
                        resetForm()
                    }}>
                    <Form>
                        <SignUpInputField />
                        <div className='flex flex-col items-center'>
                            <div>
                                <button type='submit' className='border font-bold px-24 py-2.5 rounded-md border-gray-400 mt-5 text-white hover:white hover:border-lightgreen hover:scale-95 hover:font-semibold bg-lightgreen'>
                                    {
                                        loading ? (
                                            <h1 className='animate-bounce duration-100'>Loading...</h1>
                                        ) :
                                            (
                                                <h1 className='animate-pulse duration-100'>
                                                    Create Account
                                                </h1>
                                            )
                                    }
                                </button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
            <ToastContainer />
        </div>
    )
}

export default SignUp
