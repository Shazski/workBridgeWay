import { NavLink } from "react-router-dom"
import LOGO from "../../assets/images/Logo.png"
import { IoExitOutline } from "react-icons/io5"
const AdminSideBar = () => {
    return (
        <>
            <div className='border-e-2 md:flex md:flex-col hidden md:sticky top-0 md:w-6/12 lg:w-3/12 xl:w-2/12 w-7/12 h-screen overflow-y-auto'>
                <div className='flex'>
                    <img src={LOGO} alt="" className='w-28' />
                    <h1 className='mt-5 font-bold text-green-500'>WorkBridgeWay</h1>
                </div>
                <div className='mt-12 ms-9 flex gap-3'>

                    <NavLink to='/admin-dashboard' className={({ isActive }) => {
                        return `px-6 py-3 w-52 ${isActive ? "text-green-500 bg-gray-400 rounded-md" : "text-gray-500"}`
                    }}> Dashboard </NavLink>
                </div>
                <div className='mt-3 ms-9 flex gap-3'>

                    <NavLink to='/admin-company-requests' className={({ isActive }) => {
                        return `px-6 py-3 w-52 ${isActive ? "text-green-500 bg-gray-400 rounded-md" : "text-gray-500"}`
                    }}> Company requests </NavLink>
                </div>
                <div className='mt-3 ms-9 flex gap-3'>

                    <NavLink to='/admin-companies' className={({ isActive }) => {
                        return `px-6 py-3 w-52 ${isActive ? "text-green-500 bg-gray-400 rounded-md" : "text-gray-500"}`
                    }}> All companies </NavLink>
                </div>
                <div className='mt-3 ms-9 flex gap-3'>

                    <NavLink to='/admin-company-complaints' className={({ isActive }) => {
                        return `px-6 py-3 w-52 ${isActive ? "text-green-500 bg-gray-400 rounded-md" : "text-gray-500"}`
                    }}> All Complaints </NavLink>
                </div>
                <div className="flex mt-64 ms-12 relative">
                    <IoExitOutline className="absolute text-xl text-red-600 top-4 ms-5" />
                    <h1 className=" bg-gray-300 px-12 py-3 rounded-lg text-red-600 mt-0.5">Logout</h1>
                </div>
                <div className="flex profile mt-auto">
                    <div>
                        <img src={LOGO} alt="" className="w-32" />
                    </div>
                    <div>
                        <h1 className="font-semibold text-lg mt-2">Admin</h1>
                        <h1 className="text-gray-500 ">Admin@gmail.com</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminSideBar
