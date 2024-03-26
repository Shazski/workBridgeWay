import { NavLink, Outlet } from "react-router-dom"
import { GoHome } from "react-icons/go";
import { FiGitPullRequest } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { MdCorporateFare } from "react-icons/md";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import LOGO from "../../assets/images/Logo.png"
import { IoExitOutline } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../../redux/actions/user/userActions";
import { AppDispatch, RootState } from "../../redux/store";
import { useContext, useEffect, useState } from "react";
import { MdCategory } from "react-icons/md";
import { addCategory, getCategory } from "../../redux/actions/company/CompanyActions";
import { pushCategory } from "../../redux/reducers/company/companySlice";
import Modal from "../Modal";
import { SocketContext } from "../../context/SocketContext";
const AdminSideBar = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [categoryString, setCategoryString] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const { socket } = useContext(SocketContext) || {}
    const { category } = useSelector((state: RootState) => state.company)
    const { user } = useSelector((state: RootState) => state.user)
    const handleSubmit = async () => {
        const categoryData = {
            category: categoryString,
            description
        }
        if (category?.includes(categoryString.toLowerCase())) {
            return setError("Category is already added")
        }
        const res = await dispatch(addCategory(categoryData))
        dispatch(pushCategory(res?.payload?.category))
        setCategoryString('')
        setDescription('')
        setIsModalOpen(false)
    }

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError('')
            }, 5000)
        }
        dispatch(getCategory())
    }, [error, dispatch])

    const handleLogout = () => {
        if (socket && user?._id) {
            dispatch(logoutUser({ socket, userId: user._id }));
        }
    };
    return (
        <div className="flex">
            <div className='border-e-2 scrollbar md:flex md:flex-col md:sticky top-0 md:w-3/6 lg:w-2/6 xl:w-3/12 w-1/4 h-screen overflow-y-auto'>
                <div className='flex'>
                    <img src={LOGO} alt="" className='w-24' />
                    <h1 className='mt-5 font-bold text-lightgreen hidden md:flex '>WorkBridgeWay</h1>
                </div>
                <div className='mt-12 md:ms-5 inline-flex gap-3'>

                    <NavLink to='/admin/dashboard' className={({ isActive }) => {
                        return `px-6 py-3 w-16 md:w-52 hover:text-lightgreen hover:bg-gray-200 rounded-md ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                    }}> <div className="inline-flex gap-3">
                            <GoHome className="text-xl" /> <h1 className="hidden md:flex">
                                Dashboard
                            </h1>
                        </div> </NavLink>
                </div>
                <div className='mt-3 md:ms-5 flex gap-3'>

                    <NavLink to='/admin/company-requests' className={({ isActive }) => {
                        return `px-6 py-3 w-16 md:w-52 hover:text-lightgreen hover:bg-gray-200 rounded-md ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                    }}> <div className="flex gap-3">
                            <FiGitPullRequest className="text-xl" />
                            <h1 className="hidden md:flex">
                                Company request
                            </h1>
                        </div>
                    </NavLink>
                </div>
                {/* <div className='mt-3 md:ms-5 flex gap-3'>

                    <NavLink to='/admin/companies' className={({ isActive }) => {
                        return `px-6 py-3 w-16 md:w-52 hover:text-lightgreen hover:bg-gray-200 rounded-md ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                    }}> <div className="flex gap-3">
                            <MdCorporateFare className="text-xl" />
                            <h1 className="hidden md:flex">
                                All companies
                            </h1>
                        </div>
                    </NavLink>
                </div> */}
                <div className='mt-3 md:ms-5 flex gap-3'>

                    <NavLink to='/admin/all-users' className={({ isActive }) => {
                        return `px-6 py-3 w-16 md:w-52 hover:text-lightgreen hover:bg-gray-200 rounded-md ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                    }}>
                        <div className="flex gap-3">
                            <FaUsers className="text-xl" />
                            <h1 className="hidden md:flex">All Users</h1>
                        </div>
                    </NavLink>
                </div>
                {/* <div className='mt-3 md:ms-5 flex gap-3'>

                    <NavLink to='/admin/company-complaints' className={({ isActive }) => {
                        return `px-6 py-3 w-16 md:w-52 hover:text-lightgreen hover:bg-gray-200 rounded-md ${isActive ? "text-lightgreen bg-gray-200 rounded-md" : "text-gray-500"}`
                    }}>
                        <div className="flex gap-3">
                            <MdOutlineReportGmailerrorred className="text-xl" />
                            <h1 className="hidden md:flex">
                                All Complaints
                            </h1>
                        </div>
                    </NavLink>
                </div> */}
                <div className='mt-3 md:ms-5 flex gap-3'>

                    <button onClick={() => setIsModalOpen(true)}>
                        <div className="flex gap-3 ms-6 text-gray-600">
                            <MdCategory className="text-xl" />
                            <h1 className="hidden md:flex">
                                Add Category
                            </h1>
                        </div>
                    </button>
                </div>
                <div onClick={handleLogout} className="flex mt-60 md:ms-8 relative cursor-pointer">
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
            <div className="w-full">
                <Outlet />
            </div>
            <Modal isVisible={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="flex flex-col">
                    {error && <h1 className="text-red-600 font-semibold">{error}</h1>}
                    <div className="w-full">
                        <input name="category" className="border rounded-md py-2 px-4 w-full outline-none" value={categoryString} onChange={(e) => setCategoryString(e.target.value)} placeholder="eg:Sales" />
                        <input name="description" className="border rounded-md py-2 mt-2 px-4 w-full outline-none" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="eg:This is for sales category" />
                    </div>
                    <div className="grid place-content-center">
                        <button onClick={handleSubmit} type="button" className="bg-black w-20 mt-3 text-white font-semibold px-3 py-1 rounded-md">ADD</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default AdminSideBar
