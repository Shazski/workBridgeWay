import { FC } from 'react'
import LOGO from "../../assets/images/Logo.png"
import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { logoutUser } from '../../redux/actions/user/userActions'
import { AppDispatch } from '../../redux/store'
const Navbar: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { user } = useSelector((state: any) => state.user)
    return (
        <div className='flex fixed top-0 w-full z-50 bg-white shadow-md'>
            <div className='flex items-center gap-3'>
                <img src={LOGO} alt="" className='w-36' />
                <NavLink to='/jobs' className='font-sans hover:cursor-pointer'>Find Jobs</NavLink>
                <NavLink to="/companies" className='font-sans hidden sm:block hover:cursor-pointer'>Browse Companies</NavLink>
            </div>
            <div className='flex gap-3 items-center md:ms-auto ms-32  md:me-64 '>
                {
                    !user ? (
                        <>

                            <Link to='/login' className=' md:border-e-2 border-gray-200 pe-10 py-2 text-lightgreen font-bold'>Login</Link>
                            <Link to='/signup' className=' hidden md:flex rounded-sm text-white bg-lightgreen px-3 py-2'>Sign Up</Link>
                        </>
                    )
                        : (
                            <div className='flex gap-3'>
                                <h1 className='font-medium mt-3'>Welcome {user.userName}</h1>
                                <h1 className='bg-lightgreen px-4 py-3 cursor-pointer text-white font-semibold'>DashBoad</h1>
                                <h1 onClick={() => { dispatch(logoutUser()), toast.success("logout successfull") }} className='bg-red-500 px-4 py-3 cursor-pointer text-white font-semibold'>Logout</h1>
                            </div>
                        )
                }
            </div>
            <ToastContainer />
        </div>
    )
}

export default Navbar
