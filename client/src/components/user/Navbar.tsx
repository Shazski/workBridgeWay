import { FC } from 'react'
import LOGO from "../../assets/images/Logo.png"
import { Link, NavLink } from 'react-router-dom'
const Navbar: FC = () => {
    return (
        <div className='flex fixed top-0 w-full z-50 bg-white shadow-md'>
            <div className='flex items-center gap-3'>
                <img src={LOGO} alt="" className='w-36' />
                <NavLink to='/jobs' className='font-sans hover:cursor-pointer'>Find Jobs</NavLink>
                <NavLink to="/companies" className='font-sans hidden sm:block hover:cursor-pointer'>Browse Companies</NavLink>
            </div>
            <div className='flex gap-3 items-center md:ms-auto ms-32  md:me-64 '>
                <Link to='/login' className=' md:border-e-2 border-gray-200 pe-10 py-2 text-green-500 font-bold'>Login</Link>
                <Link to='/signup' className=' hidden md:flex rounded-sm text-white bg-green-500 px-3 py-2'>Sign Up</Link>
            </div>
        </div>
    )
}

export default Navbar
