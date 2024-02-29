import { useState } from "react";
import SearchBar from "../SearchBar";
import JobApplicantsTable from "./JobApplicantsTable";

const JobApplicantsSection = () => {
    const [search, setSearch] = useState<string>("");
    const handleSearch = (searchString: string) => {
        setSearch(searchString)
    }
    return (
        <div className="w-full">
            <div className="filter  md:flex justify-around mt-6">
                <SearchBar sentSearchStringToParent={handleSearch} />
            </div>
            <div>
                <JobApplicantsTable search={search} />
            </div>
        </div>
    )
}

export default JobApplicantsSection
