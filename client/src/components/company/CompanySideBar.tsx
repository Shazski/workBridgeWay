import LOGO from "../../assets/images/Logo.png"
import { NavLink } from 'react-router-dom'
const CompanySideBar = () => {
    return (
        <>
            <div className='border-e-2 md:flex md:flex-col hidden md:sticky top-0 md:w-6/12 lg:w-3/12 xl:w-2/12 w-7/12 h-screen overflow-y-auto'>
                <div className='flex'>
                    <img src={LOGO} alt="" className='w-28' />
                    <h1 className='mt-5 font-bold text-green-500'>WorkBridgeWay</h1>
                </div>
                <div className='mt-12 ms-9 flex gap-3'>

                    <NavLink to='/company-dashboard' className={({ isActive }) => {
                        return `px-6 py-3 w-52 ${isActive ? "text-green-500 bg-gray-400 rounded-md" : "text-gray-500"}`
                    }}> Dashboard </NavLink>
                </div>
                <div className='mt-3 ms-9 flex gap-3'>

                    <NavLink to='/company-messages/2' className={({ isActive }) => {
                        return `px-6 py-3 w-52 ${isActive ? "text-green-500 bg-gray-400 rounded-md" : "text-gray-500"}`
                    }}> Messages </NavLink>
                </div>
                <div className='mt-3 ms-9 flex gap-3'>

                    <NavLink to='/company-profile' className={({ isActive }) => {
                        return `px-6 py-3 w-52 ${isActive ? "text-green-500 bg-gray-400 rounded-md" : "text-gray-500"}`
                    }}> Company Profile </NavLink>
                </div>
                <div className='mt-3 ms-9 flex gap-3'>

                    <NavLink to='/company-applicants' className={({ isActive }) => {
                        return `px-6 py-3 w-52 ${isActive ? "text-green-500 bg-gray-400 rounded-md" : "text-gray-500"}`
                    }}> All Applicants </NavLink>
                </div>
                <div className='mt-3 ms-9 flex gap-3'>

                    <NavLink to='/company-jobList' className={({ isActive }) => {
                        return `px-6 py-3 w-52 ${isActive ? "text-green-500 bg-gray-400 rounded-md" : "text-gray-500"}`
                    }}> Job Listing </NavLink>
                </div>
                <div className='mt-3 ms-9 flex gap-3'>

                    <NavLink to='/company-employees' className={({ isActive }) => {
                        return `px-6 py-3 w-52 ${isActive ? "text-green-500 bg-gray-400 rounded-md" : "text-gray-500"}`
                    }}> Employees </NavLink>
                </div>
                <div className='mt-3 ms-9 flex gap-3 mb-10'>

                    <NavLink to='/company-Schedule' className={({ isActive }) => {
                        return `px-6 py-3 w-52 ${isActive ? "text-green-500 bg-gray-400 rounded-md" : "text-gray-500"}`
                    }}> My Schedule </NavLink>
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
