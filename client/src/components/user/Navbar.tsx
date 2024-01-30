import { FC } from 'react'
import LOGO from "../../assets/images/Logo.png"
import PROFILE from "../../assets/images/defaultProfile.jpg"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { logoutUser } from '../../redux/actions/user/userActions'
import { AppDispatch } from '../../redux/store'
const Navbar: FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { user } = useSelector((state: any) => state.user)

    return (
        <div className='flex fixed top-0 w-full z-50 bg-white justify-between items-center shadow-md'>
            <div className='flex items-center gap-3'>
                <img onClick={() => navigate('/')} src={LOGO} alt="" className='w-36 cursor-pointer' />
                <NavLink to='/jobs' className={({ isActive }) => {
                    return `font-sans hover:cursor-pointer ${isActive ? 'border-b-4 border-lightgreen text-lightgreen' : ''}`
                }}>Find Jobs</NavLink>
                <NavLink to="/companies" className='font-sans hidden sm:block hover:cursor-pointer'>Browse Companies</NavLink>
            </div>
            <div className='flex gap-3 md:me-[125px]'>
                {
                    user?.role === "user" ? (
                        <div className='flex gap-2'>

                            <div className='mt-1.5'>
                                <Link to="/user/dashboard" className='border bg-lightgreen px-4 py-2 cursor-pointer rounded-md text-white  font-semibold'>Dashboard</Link>
                            </div>

                            <div className='group'>
                                <img src={`${user?.profilePic || PROFILE}`} alt="no profile found" className='w-10 rounded-full h-10 duration-700 hover:cursor-pointer' />
                                <div className='w-full h-full bg-transparent'>
                                    <div className='absolute  flex-col items-center gap-3 top-20 rounded-md bg-white right-5 w-60 hidden group-hover:flex hover:flex'>
                                        <div>
                                            <h1 className='text-center'>{user?.userName}</h1>
                                        </div>
                                        <div className='mb-4'>
                                            <h1 onClick={() => { dispatch(logoutUser()), toast.success("logout successfull") }} className='bg-red-500 px-4 py-1.5 rounded-md cursor-pointer text-center text-white font-semibold w-24'>Logout</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                        : (
                            <div className='flex gap-3'>
                                <Link to='/login' className=' md:border-e-2 border-gray-200 pe-6 py-2 text-lightgreen font-bold'>Login</Link>
                                <Link to='/signup' className=' hidden md:flex rounded-sm text-white bg-lightgreen px-3 py-2'>Sign Up</Link>
                            </div>
                        )
                }

            </div>
        </div>
    )
}

export default Navbar
