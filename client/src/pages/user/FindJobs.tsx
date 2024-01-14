import FindJobSideBar from "../../components/user/FindJobSideBar"
import FindJobTopSection from "../../components/user/FindJobBannerSection"
import Navbar from "../../components/user/Navbar"

const FindJobs = () => {
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className="bg-blue-50">
            <FindJobTopSection/>
            </div>
            <div className="flex justify-center ">
                <FindJobSideBar/>
            </div>
        </div>
    )
}

export default FindJobs
