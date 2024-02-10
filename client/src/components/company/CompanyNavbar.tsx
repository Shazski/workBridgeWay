import LOGO from "../../assets/images/Logo.png"
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
const CompanyNavbar = () => {
    const { user } = useSelector((state: any) => state.user)
    return (
        <div className="flex w-full sticky top-0 z-50 bg-white justify-between h-20 border-b-2">
            <div className="flex mt-1">
                <div>
                    <img src={LOGO} alt="" className="w-32" />
                </div>
                <div className="mt-3">
                    <h1>Company</h1>
                    <h1 className="font-semibold uppercase">{user.name}</h1>
                </div>
            </div>
            <div className="mt-6">
                <Link to={'/company/post-job'} className="bg-lightgreen  rounded-sm px-4 py-2 mt-5 me-12 text-white font-bold">+ Post a job</Link>
            </div>
        </div>
    )
}

export default CompanyNavbar
