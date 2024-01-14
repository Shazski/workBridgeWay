import FindJobCard from "../../components/user/FindJobCard"
import JobDescriptionSection from "../../components/user/JobDescriptionSection"
import Navbar from "../../components/user/Navbar"

const JobDescription = () => {
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className="mt-24  text-center ">
                <FindJobCard showCatTag={false} showApplied={false} />
            </div>
            <div className="">
                <JobDescriptionSection/>
            </div>
        </div>
    )
}

export default JobDescription
