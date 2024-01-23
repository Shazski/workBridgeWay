import { FC, useEffect } from 'react'
import LOGO from "../../assets/images/Logo.png"
import PROFILE from "../../assets/images/defaultProfile.jpg"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { logoutUser } from '../../redux/actions/user/userActions'
import { AppDispatch } from '../../redux/store'
const Navbar: FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { user } = useSelector((state: any) => state.user)
    useEffect(() => {
        console.log(user)
    }, [user]);

    return (
        <div className='flex fixed top-0 w-full z-50 bg-white justify-between items-center shadow-md'>
            <div className='flex items-center gap-3'>
                <img onClick={() => navigate('/')} src={LOGO} alt="" className='w-36 cursor-pointer' />
                <NavLink to='/jobs' className={({ isActive }) => {
                    return `font-sans hover:cursor-pointer ${isActive ? 'border-b-4 border-lightgreen text-lightgreen' : ''}`
                }}>Find Jobs</NavLink>
                <NavLink to="/companies" className='font-sans hidden sm:block hover:cursor-pointer'>Browse Companies</NavLink>
            </div>
            <div className='flex gap-3 md:ms-60'>
                {
                    !user ? (
                        <>

                            <Link to='/login' className=' md:border-e-2 border-gray-200 pe-10 py-2 text-lightgreen font-bold'>Login</Link>
                            <Link to='/signup' className=' hidden md:flex rounded-sm text-white bg-lightgreen px-3 py-2'>Sign Up</Link>
                        </>
                    )
                        : (
                            <div className='flex gap-2'>
                                <div>
                                    <h1 className='font-medium mt-2 hidden md:flex'>Welcome {user.userName}</h1>
                                </div>
                                <div>
                                    <img src={`${user.profilePic || PROFILE}`} alt="no profile found" className='w-10 rounded-full' />
                                </div>
                                <div>
                                    <h1 className='border border-lightgreen px-4 py-2 cursor-pointer rounded-md text-lightgreen font-medium'>Dashboard</h1>
                                </div>
                                <div>
                                    <h1 onClick={() => { dispatch(logoutUser()), toast.success("logout successfull") }} className='bg-red-500 px-4 py-2 rounded-md cursor-pointer text-white font-semibold'>Logout</h1>
                                </div>
                            </div>
                        )
                }
            </div>
            <ToastContainer />
        </div>
    )
}

export default Navbar
