import { NavLink, Outlet, useLocation } from "react-router-dom"
import { GoHome } from "react-icons/go";
import { FiGitPullRequest } from "react-icons/fi";
import { MdCorporateFare } from "react-icons/md";
import { TbMessageReport } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import LOGO from "../../assets/images/Logo.png"
import { IoExitOutline } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { logoutUser } from "../../redux/actions/user/userActions";
const UserSidebar = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { user } = useSelector((state: any) => state.user)
    const location = useLocation();
    const isSettingsActive = () => {
        return location.pathname.startsWith('/user/settings');
    };
    return (
        <div className="flex">
            <div className='border-e-2 scrollbar md:flex md:flex-col md:sticky top-0 md:w-3/6 lg:w-2/6 xl:w-3/12 w-1/4 h-screen overflow-y-auto'>
                <div className='flex'>
                    <NavLink to="/"><img src={LOGO} alt="" className='w-24' /></NavLink>
                    <h1 className='mt-5 font-bold text-lightgreen hidden md:flex '>WorkBridgeWay</h1>
                </div>
                <div className='mt-12 ms-3  inline-flex gap-3'>

                    <NavLink to='/user/dashboard' className={({ isActive }) => {
                        return `px-6 py-3 w-16 md:w-52 ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                    }}> <div className="inline-flex gap-3">
                            <GoHome className="text-xl" /> <h1 className="hidden md:flex">
                                Dashboard
                            </h1>
                        </div> </NavLink>
                </div>
                <div className='mt-3 ms-3 flex gap-3'>

                    <NavLink to='/user/messages' className={({ isActive }) => {
                        return `px-6 py-3 w-16 md:w-52 ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                    }}> <div className="flex gap-3">
                            <FiGitPullRequest className="text-xl" />
                            <h1 className="hidden md:flex">
                                Messages
                            </h1>
                        </div>
                    </NavLink>
                </div>
                <div className='mt-3 ms-3 flex gap-3'>

                    <NavLink to='/user/applications' className={({ isActive }) => {
                        return `px-6 py-3 w-16 md:w-52 ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                    }}> <div className="flex gap-3">
                            <MdCorporateFare className="text-xl" />
                            <h1 className="hidden md:flex">
                                My Applications
                            </h1>
                        </div>
                    </NavLink>
                </div>
                <div className='mt-3 ms-3 flex gap-3'>

                    <NavLink to='/user/profile' className={({ isActive }) => {
                        return `px-6 py-3 w-16 md:w-52 ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                    }}>
                        <div className="flex gap-3">
                            <TbMessageReport className="text-xl" />
                            <h1 className="hidden md:flex">
                                My Profile
                            </h1>
                        </div>
                    </NavLink>
                </div>
                <div className='mt-3 ms-3 flex gap-3'>

                <NavLink
                    to="/user/settings/edit-profile"
                    className={`px-6 py-3 w-16 md:w-52 ${isSettingsActive() ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`}
                >
                        <div className="flex gap-3">
                            <CiSettings className="text-xl" />
                            <h1 className="hidden md:flex">
                                Settings
                            </h1>
                        </div>
                    </NavLink>
                </div>
                <div onClick={() => dispatch(logoutUser())} className="flex cursor-pointer mt-40 md:ms-8 ms-3 relative">
                    <div>
                        <IoExitOutline className="absolute text-xl text-red-600 top-4 ms-5  " />
                        <h1 className=" bg-gray-300 px-8 md:px-12 py-6 md:py-3 rounded-lg text-red-600 mt-0.5 md:flex"><span className="hidden md:flex">Logout</span></h1>
                    </div>
                </div>
                <div className="flex profile mt-2">
                    <div>
                        <img src={LOGO} alt="" className="w-20 hidden md:flex rounded-full" />
                    </div>
                    <div className="mb-2 mt-auto ms-1">
                        <h1 className="font-semibold text-md mt-2">{user?.userName}</h1>
                        <h1 className="text-gray-500 text-sm hidden md:flex">{user?.email}</h1>
                    </div>
                </div>
            </div>
            <div className="w-full">
            <Outlet />
            </div>
        </div>
    )
}

export default UserSidebar
