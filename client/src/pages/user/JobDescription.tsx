import { useEffect, useState } from "react"
import FindJobCard from "../../components/user/FindJobCard"
import JobDescriptionSection from "../../components/user/JobDescriptionSection"
import Navbar from "../../components/user/Navbar"
import { IJobData } from "../../interface/ICompanyData"
import { useParams } from "react-router-dom"
import axios from "axios"
import { USER_BASE_URL } from "../../config/constants"

const JobDescription = () => {

    const [jobData, setJobData] = useState<IJobData>({})
    const { id } = useParams()

    useEffect(() => {
        const fetchJobDetailsById = async () => {
            const { data } = await axios.get(`${USER_BASE_URL}/get-job-details/${id}`)
            setJobData(data)
            console.log(data, "data proceeded")
        }
        fetchJobDetailsById()
    }, [])
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className="mt-24  text-center ">
                <FindJobCard showCatTag={false} showApplied={false} jobs={jobData} />
            </div>
            <div className="">
                <JobDescriptionSection job={jobData} />
            </div>
        </div>
    )
}

export default JobDescription
