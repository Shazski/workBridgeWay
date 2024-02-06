import { FC, useState, FormEvent } from 'react'
import Navbar from "../../components/user/LoginNavbar"
import LOGINPAGEIMAGE from "../../assets/images/LoginPageImage.png"
import CLOSEEYE from "../../assets/images/close-eye.jpg"
import OPENEYE from "../../assets/images/open-eye.png"
import BLURIMAGE from "../../assets/images/blur-image.png"
import { useSelector, useDispatch } from 'react-redux'
import useForm from '../../hooks/useForm'
import { IUserLoginData } from '../../interface/IuserLogin'
import GoogleAuthButton from '../../components/user/GoogleAuthButton'
import { AppDispatch } from '../../redux/store'
import { userLogin } from '../../redux/actions/user/userActions'
const Login: FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const { values, handleChange } = useForm({} as IUserLoginData)
    const { error } = useSelector((state: any) => state.user)
    const dispatch = useDispatch<AppDispatch>()
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(userLogin(values))
    }
    return (
        <div className='flex justify-center' >
            <div className='md:w-4/6 w-11/12 flex flex-col items-center'>
                <Navbar />
                <div className='text-center'>
                    <h1 className='font-bold text-3xl mt-16'>Welcome Back</h1>
                    <h3 className='mt-2 text-sm font-semibold'>Login into your account</h3>
                </div>
                <div>
                    <GoogleAuthButton />
                </div>
                <div>
                    <div className="flex items-center justify-center text-center">
                        <div className="pt-5 border-b border-gray-500 w-8 mx-2"></div>
                        <h1 className='text-center pt-5 text-xs'>Or continue with</h1>
                        <div className="pt-5 border-b border-gray-500 w-8 mx-2"></div>
                    </div>
                </div>
                {error && <h1 className="font-semibold text-red-600">{error}</h1>}
                <div className='text-center pt-12'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input type="text" placeholder='Email' name="email" onChange={handleChange} className='border ps-2 outlin rounded-md h-12 w-64' required />
                        </div>
                        <div className='flex justify-center relative'>
                            <input name="password" type={showPassword ? "text" : "password"} onChange={handleChange} placeholder='Password' className='border  ps-2 rounded-md h-12 w-64 mt-5' required />
                            <img className='absolute hover:cursor-pointer top-6 right-1/4 w-6 h-8 pt-2 lg:right-auto ms-56 lg:left-auto' src={showPassword ? OPENEYE : CLOSEEYE} alt="" onClick={() => setShowPassword(!showPassword)} />
                        </div>
                        <div className=''>
                            <h2 className='text-red-600 hover:cursor-pointer pt-2 text-center'>Reset password</h2>
                        </div>
                        <div>
                            <button className='border px-24 py-2.5 rounded-md border-gray-400 mt-5 text-gray-400 hover:text-lightgreen hover:border-lightgreen hover:scale-105 hover:font-semibold'>
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='relative'>
                <div>
                    <img className='hidden md:flex h-screen' src={LOGINPAGEIMAGE} alt="" />
                </div>
                <div>
                    <img className=' absolute top-96 xl:left-16 lg:left-8   md:left-2 left-2 -mt-2
                    -ml-2 z-10 w-[25rem]' src={BLURIMAGE} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Login
