import { CiSearch } from "react-icons/ci";
import JobApplicantsTable from "./JobApplicantsTable";

const JobApplicantsSection = () => {
    return (
        <div className="mt-10 md:ms-12 w-full">
            <div className="filter  md:flex justify-between">
                <div>
                <h1 className="font-serif font-medium text-xl">Total Applicants: <span>19</span></h1>
                </div>
                <div className="flex me-60">
                    <CiSearch className="absolute mt-3 ms-3 text-2xl font-bold"/>
                    <input type="text" className="border border-gray-400 rounded-md py-3 px-12 outline-none" placeholder="Search"/>
                </div>
                
            </div>
            <div>
                <JobApplicantsTable/>
            </div>
        </div>
    )
}

export default JobApplicantsSection
