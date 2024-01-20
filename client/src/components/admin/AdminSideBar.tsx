import { NavLink } from "react-router-dom"
import { GoHome } from "react-icons/go";
import { FiGitPullRequest } from "react-icons/fi";
import { MdCorporateFare } from "react-icons/md";
import { TbMessageReport } from "react-icons/tb";
import LOGO from "../../assets/images/Logo.png"
import { IoExitOutline } from "react-icons/io5"
const AdminSideBar = () => {
    return (
        <>
            <div className='border-e-2 md:flex md:flex-col md:sticky top-0 md:w-4/12 lg:w-3/12 xl:w-3/12 2xl:w-2/12 w-2/12 h-screen overflow-y-auto'>
                <div className='flex'>
                    <img src={LOGO} alt="" className='w-24' />
                    <h1 className='mt-5 font-bold text-lightgreen hidden md:flex '>WorkBridgeWay</h1>
                </div>
                <div className='mt-12 md:ms-3 inline-flex gap-3'>

                    <NavLink to='/admin-dashboard' className={({ isActive }) => {
                        return `px-6 py-3 w-16 md:w-52 ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                    }}> <div className="inline-flex gap-3">
                            <GoHome className="text-xl" /> <h1 className="hidden md:flex">
                                Dashboard
                                </h1>
                        </div> </NavLink>
                </div>
                <div className='mt-3 md:ms-3 flex gap-3'>

                    <NavLink to='/admin-company-requests' className={({ isActive }) => {
                        return `px-6 py-3 w-16 md:w-52 ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                    }}> <div className="flex gap-3">
                            <FiGitPullRequest className="text-xl" />
                            <h1 className="hidden md:flex">
                            Company request
                            </h1>
                        </div>
                    </NavLink>
                </div>
                <div className='mt-3 md:ms-3 flex gap-3'>

                    <NavLink to='/admin-companies' className={({ isActive }) => {
                        return `px-6 py-3 w-16 md:w-52 ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                    }}> <div className="flex gap-3">
                            <MdCorporateFare className="text-xl" />
                            <h1 className="hidden md:flex">
                            All companies
                            </h1>
                        </div>
                    </NavLink>
                </div>
                <div className='mt-3 md:ms-3 flex gap-3'>

                    <NavLink to='/admin-company-complaints' className={({ isActive }) => {
                        return `px-6 py-3 w-16 md:w-52 ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                    }}>
                        <div className="flex gap-3">
                            <TbMessageReport className="text-xl" />
                            <h1 className="hidden md:flex">
                            All Complaints
                            </h1>
                        </div>
                    </NavLink>
                </div>
                <div className="flex mt-60 md:ms-8 relative">
                    <div>
                    <IoExitOutline className="absolute text-xl text-red-600 top-4 ms-5  " />
                    <h1 className=" bg-gray-300 px-8 md:px-12 py-6 md:py-3 rounded-lg text-red-600 mt-0.5 md:flex"><span className="hidden md:flex">Logout</span></h1>
                    </div>
                </div>
                <div className="flex profile mt-auto">
                    <div>
                        <img src={LOGO} alt="" className="w-20 hidden md:flex rounded-full" />
                    </div>
                    <div className="mb-2 mt-auto">
                        <h1 className="font-semibold text-md mt-2">Admin</h1>
                        <h1 className="text-gray-500 text-sm hidden md:flex">Admin@gmail.com</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminSideBar
