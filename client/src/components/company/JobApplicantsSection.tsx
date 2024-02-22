import SearchBar from "../SearchBar";
import JobApplicantsTable from "./JobApplicantsTable";

const JobApplicantsSection = () => {
    return (
        <div className=" w-full">
            <div className="filter  md:flex justify-around mt-6">
                <div>
                    <h1 className="font-serif font-medium text-xl">Total Applicants: <span>19</span></h1>
                </div>
                <SearchBar/>

            </div>
            <div>
                <JobApplicantsTable />
            </div>
        </div>
    )
}

export default JobApplicantsSection
