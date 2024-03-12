import LOGO from "../../assets/images/Logo.png"
import { NavLink, Outlet } from 'react-router-dom'
import { IoExitOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { ImProfile } from "react-icons/im";
import { GoHome } from "react-icons/go";
import { GiHamburgerMenu } from "react-icons/gi";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../../redux/actions/user/userActions";
import { useState } from "react";
const EmployeeSideBar = () => {

    const dispatch = useDispatch<AppDispatch>()
    const { user } = useSelector((state: RootState) => state.user)

    const [toggle, setToggle] = useState<boolean>(false);

    return (
        <>
            <div className={`ms-5 flex lg:hidden sticky justify-center top-3 z-50 cursor-pointer mt-2`}>
                <GiHamburgerMenu onClick={() => setToggle(!toggle)} className="text-2xl" />
            </div>
            <div className="flex">
                <div className={`border-e-2 fixed lg:sticky top-3 lg:translate-x-0 scrollbar transition-all duration-300 bg-white flex-col md:w-2/6 lg:w-2/6 xl:w-3/12 2xl:w-1/5 w-3/12 h-screen overflow-y-auto ${toggle ? 'translate-x-0 z-40 fixed ' : '-translate-x-96'}`}>
                    <div className='md:flex hidden'>
                        <img src={LOGO} alt="" className='w-28' />
                        <h1 className='mt-5 font-bold text-lightgreen hidden md:flex'>WorkBridgeWay</h1>
                        {
                            toggle &&
                            <h1 onClick={() => setToggle(false)} className='mt-5 ms-10 font-bold text-black hidden md:flex'>X</h1>
                        }
                    </div>
                    <div className='mt-12 md:ms-3 flex gap-3'>

                        <NavLink to='/employee/dashboard' className={({ isActive }) => {
                            return `px-6 py-3 w-16 ms-7 md:ms-3 md:w-52 hover:text-lightgreen hover:bg-gray-200 rounded-md ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                        }}> <div className="md:flex gap-x-3">
                                <GoHome className="text-xl" />
                                <h1 className="hidden md:flex">Dashboard</h1>
                            </div> </NavLink>
                    </div>

                    <div className='mt-3 md:ms-3 flex gap-3'>

                        <NavLink to='/employee/attendance' className={({ isActive }) => {
                            return `px-6 py-3 w-16 ms-7 md:ms-3 md:w-52 hover:text-lightgreen hover:bg-gray-200 rounded-md ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                        }}> <div className="flex gap-3">
                                <ImProfile className="text-xl" />
                                <h1 className="hidden md:flex">Attendance</h1>
                            </div> </NavLink>
                    </div>
                    
                    {/* <div className='mt-3 md:ms-3 flex gap-3'>

                        <NavLink to='/employee/leaves' className={({ isActive }) => {
                            return `px-6 py-3 w-16 ms-7 md:ms-3 md:w-52 hover:text-lightgreen hover:bg-gray-200 rounded-md ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                        }}> <div className="flex gap-3">
                                <SlCalender className="text-xl" />
                                <h1 className="hidden md:flex">View Leaves</h1>
                            </div> </NavLink>
                    </div> */}
                    <div className="fixed bottom-10 w-full">
                <div onClick={() => dispatch(logoutUser())} className="flex ms-9 items-center  justify-start relative cursor-pointer">
                    <div>
                        <IoExitOutline className="text-xl absolute top-4 left-5 text-red-600" />
                        <h1 className="bg-gray-300 px-10 ms-2 py-6 rounded-lg h-12 text-red-600 text-center flex mt-0.5 justify-center items-center ">
                            <span>Logout</span>
                        </h1>
                    </div>
                </div>
                <div className="flex profile justify-start ms-12 mt-2">
                    <div>
                        <h1 className="font-semibold text-lg">{user?.name}</h1>
                        <h1 className="text-gray-500 ">{user?.email}</h1>
                    </div>
                </div>
            </div>
                </div>
                <div className="w-full z-10">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default EmployeeSideBar
