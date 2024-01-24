import { NavLink, Outlet } from "react-router-dom"

const SettingsNavbar = () => {
    return (
        <>
            <div className="flex gap-5 mt-5 border-b-2 h-8">
                <div className="ms-6">
                    <NavLink to={'/user/settings/edit-profile'} className={({ isActive }) => {
                        return `text-sm ${isActive ? 'border-b-4 border-lightgreen pb-2 font-semibold' : ''}`
                    }}>My Profile</NavLink>
                </div>
                <div>
                    <NavLink className={({ isActive }) => {
                        return `text-sm ${isActive ? 'border-b-4 border-lightgreen pb-2 font-semibold' : ''}`
                    }} to={'/user/settings/edit-login'}>Login Details</NavLink>
                </div>
            </div>
            <div className="border-b-2  h-14">
                <h1 className="font-semibold ms-6  md:text-lg mt-4 text-gray-700">Basic Information</h1>
                <h1 className="text-xs md:text-sm text-blue-gray-600 ms-6">This is your personal information that you can update anytime.</h1>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default SettingsNavbar
