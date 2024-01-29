import LOGO from "../../assets/images/Logo.png"
import { NavLink } from 'react-router-dom'
import { IoExitOutline } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
import { FaPeopleRoof } from "react-icons/fa6";
import { FaPeopleArrows } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { ImProfile } from "react-icons/im";
import { GoHome } from "react-icons/go";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux"
import { logoutUser } from "../../redux/actions/user/userActions";
const CompanySideBar = () => {
    const dispatch = useDispatch<AppDispatch>()
    return (
        <>
            <div className='border-e-2 md:flex md:flex-col md:sticky top-0 md:w-4/12 lg:w-3/12 xl:w-3/12 2xl:w-2/12 w-2/12 h-screen overflow-y-auto hidden'>
                <div className='flex'>
                    <img src={LOGO} alt="" className='w-28' />
                    <h1 className='mt-5 font-bold text-lightgreen hidden md:flex'>WorkBridgeWay</h1>
                </div>
                <div className='mt-3 md:ms-3 flex gap-3'>

                    <NavLink to='/company-dashboard' className={({ isActive }) => {
                        return `px-6 py-3 w-16 md:w-52 ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                    }}> <div className="flex gap-3">
                            <GoHome className="text-xl" />
                            <h1>Dashboard</h1>
                        </div> </NavLink>
                </div>
                <div className='mt-3 md:ms-3 flex gap-3'>

                    <NavLink to='/company-messages/2' className={({ isActive }) => {
                        return `px-6 py-3 w-16 md:w-52 ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                    }}> <div className="flex gap-3">
                            <FaRegMessage className="text-lg" />
                            <h1>Messages</h1>
                        </div> </NavLink>
                </div>
                <div className='mt-3 md:ms-3 flex gap-3'>

                    <NavLink to='/company-profile' className={({ isActive }) => {
                        return `px-6 py-3 w-16 md:w-52 ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                    }}> <div className="flex gap-3">
                            <ImProfile className="text-xl" />
                            <h1>Profile</h1>
                        </div> </NavLink>
                </div>
                <div className='mt-3 md:ms-3 flex gap-3'>

                    <NavLink to='/company-applicants' className={({ isActive }) => {
                        return `px-6 py-3 w-16 md:w-52 ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                    }}> <div className="flex gap-3">
                            <IoPeopleSharp className="text-xl" />
                            <h1>Applicants</h1>
                        </div> </NavLink>
                </div>
                <div className='mt-3 md:ms-3 flex gap-3'>

                    <NavLink to='/company-jobList' className={({ isActive }) => {
                        return `px-6 py-3 w-16 md:w-52 ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                    }}> <div className="flex gap-3">
                            <FaPeopleArrows className="text-xl" />
                            <h1>Job Listing</h1>
                        </div> </NavLink>
                </div>
                <div className='mt-3 md:ms-3 flex gap-3'>

                    <NavLink to='/company-employees' className={({ isActive }) => {
                        return `px-6 py-3 w-16 md:w-52 ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                    }}> <div className="flex gap-3">
                            <FaPeopleRoof className="text-xl" />
                            <h1>Employees</h1>
                        </div> </NavLink>
                </div>
                <div className='mt-3 md:ms-3 flex gap-3'>

                    <NavLink to='/company-Schedule' className={({ isActive }) => {
                        return `px-6 py-3 w-16 md:w-52 ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                    }}> <div className="flex gap-3">
                            <SlCalender className="text-xl" />
                            <h1>Schedules</h1>
                        </div> </NavLink>
                </div>
                <div onClick={() => dispatch(logoutUser())} className="flex mt-auto ms-5 relative cursor-pointer">
                    <IoExitOutline className="absolute text-xl text-red-600 top-4 ms-5" />
                    <h1 className=" bg-gray-300 px-12 py-3 rounded-lg text-red-600 mt-0.5">Logout</h1>
                </div>
                <div className="flex profile mt-auto">
                    <div>
                        <img src={LOGO} alt="" className="w-32" />
                    </div>
                    <div>
                        <h1 className="font-semibold text-lg mt-2">Sharoon</h1>
                        <h1 className="text-gray-500 ">Sharoon@gmail.com</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CompanySideBar
