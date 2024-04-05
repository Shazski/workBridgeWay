import LOGO from "../../assets/images/Logo.png"
import { NavLink, Outlet } from 'react-router-dom'
import { IoExitOutline } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
import { FaPeopleRoof } from "react-icons/fa6";
import { FaPeopleArrows } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { ImProfile } from "react-icons/im";
import { GoHome } from "react-icons/go";
import { GiHamburgerMenu } from "react-icons/gi";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../../redux/actions/user/userActions";
import CompanyNavbar from "./CompanyNavbar";
import { useContext, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
const CompanySideBar = () => {

    const dispatch = useDispatch<AppDispatch>()
    const { user } = useSelector((state: RootState) => state.user)

    const [toggle, setToggle] = useState<boolean>(false);

    const { socket } = useContext(SocketContext) || {}

    const handleLogout = () => {
        if (socket && user?._id) {
            dispatch(logoutUser({ socket, userId: user._id }));
        }
    };
    return (
        <>
            <div className={`ms-5 flex lg:hidden sticky top-20 z-50 cursor-pointer mt-2`}>
                <GiHamburgerMenu onClick={() => setToggle(!toggle)} className="text-2xl" />
            </div>
            <div className="flex">
                <div onClick={() => { socket && socket.emit("companyCurrentRoom", "") }} className={`border-e-2 fixed  lg:sticky top-3 lg:translate-x-0 scrollbar transition-all duration-300 bg-white flex-col md:w-2/6 lg:w-2/6 xl:w-3/12 2xl:w-1/5 w-3/12 h-screen overflow-y-auto ${toggle ? 'translate-x-0 z-40 fixed ' : '-translate-x-96'}`}>
                    <div className='md:flex hidden'>
                        <img src={LOGO} alt="" className='w-28' />
                        <h1 className='mt-5 font-bold text-lightgreen hidden md:flex'>WorkBridgeWay</h1>
                        {
                            toggle &&
                            <h1 onClick={() => setToggle(false)} className='mt-5 ms-10 font-bold text-black hidden md:flex'>X</h1>
                        }
                    </div>
                    <div className='mt-12 md:ms-3 flex gap-3'>

                        <NavLink to='/company/dashboard' className={({ isActive }) => {
                            return `px-6 py-3 w-16 ms-7 md:ms-3 md:w-52 hover:text-lightgreen hover:bg-gray-200 rounded-md ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                        }}> <div className="md:flex gap-x-3">
                                <GoHome className="text-xl" />
                                <h1 className="hidden md:flex">Dashboard</h1>
                            </div> </NavLink>
                    </div>
                    <div className='mt-3 md:ms-3 flex gap-3'>

                        <NavLink to='/company/messages' className={({ isActive }) => {
                            return `px-6 py-3 w-16 ms-7 md:ms-3 md:w-52 hover:text-lightgreen hover:bg-gray-200 rounded-md ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                        }}> <div className="flex gap-3">
                                <FaRegMessage className="text-lg" />
                                <h1 className="hidden md:flex">Messages</h1>
                            </div> </NavLink>
                    </div>
                    <div className='mt-3 md:ms-3 flex gap-3'>

                        <NavLink to='/company/profile' className={({ isActive }) => {
                            return `px-6 py-3 w-16 ms-7 md:ms-3 md:w-52 hover:text-lightgreen hover:bg-gray-200 rounded-md ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                        }}> <div className="flex gap-3">
                                <ImProfile className="text-xl" />
                                <h1 className="hidden md:flex">Profile</h1>
                            </div> </NavLink>
                    </div>
                    <div className='mt-3 md:ms-3 flex gap-3'>

                        <NavLink to='/company/applicants' className={({ isActive }) => {
                            return `px-6 py-3 w-16 ms-7 md:ms-3 md:w-52 hover:text-lightgreen hover:bg-gray-200 rounded-md ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                        }}> <div className="flex gap-3">
                                <IoPeopleSharp className="text-xl" />
                                <h1 className="hidden md:flex">Applicants</h1>
                            </div> </NavLink>
                    </div>
                    <div className='mt-3 md:ms-3 flex gap-3'>

                        <NavLink to='/company/job-list' className={({ isActive }) => {
                            return `px-6 py-3 w-16 ms-7 md:ms-3 md:w-52 hover:text-lightgreen hover:bg-gray-200 rounded-md ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                        }}> <div className="flex gap-3">
                                <FaPeopleArrows className="text-xl" />
                                <h1 className="hidden md:flex">Job Listing</h1>
                            </div> </NavLink>
                    </div>
                    <div className='mt-3 md:ms-3 flex gap-3'>

                        <NavLink to='/company/employees' className={({ isActive }) => {
                            return `px-6 py-3 w-16 ms-7 md:ms-3 md:w-52 hover:text-lightgreen hover:bg-gray-200 rounded-md ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                        }}> <div className="flex gap-3">
                                <FaPeopleRoof className="text-xl" />
                                <h1 className="hidden md:flex">Employees</h1>
                            </div> </NavLink>
                    </div>
                    <div className='mt-3 md:ms-3 flex gap-3'>

                        <NavLink to='/company/Schedule' className={({ isActive }) => {
                            return `px-6 py-3 w-16 ms-7 md:ms-3 md:w-52 hover:text-lightgreen hover:bg-gray-200 rounded-md ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                        }}> <div className="flex gap-3">
                                <SlCalender className="text-xl" />
                                <h1 className="hidden md:flex">Schedules</h1>
                            </div> </NavLink>
                    </div>
                    <div onClick={handleLogout} className="flex ms-6 mt-12 md:ms-8 relative cursor-pointer">
                        <div>
                            <IoExitOutline className="absolute text-xl text-red-600 top-4 ms-5  " />
                            <h1 className=" bg-gray-300 px-8 md:px-12 py-6 md:py-3 rounded-lg text-red-600 mt-0.5 md:flex"><span className="hidden md:flex">Logout</span></h1>
                        </div>
                    </div>
                    <div className="flex profile mt-auto">
                        <div>
                            <img src={user?.companyLogo} alt="" className="w-12 h-12 mt-3 rounded-full" />
                        </div>
                        <div>
                            <h1 className="font-semibold text-lg mt-2">{user?.name}</h1>
                            <h1 className="text-gray-500 ">{user?.email}</h1>
                        </div>
                    </div>
                </div>
                <div className="w-full z-10">
                    <CompanyNavbar />
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default CompanySideBar
