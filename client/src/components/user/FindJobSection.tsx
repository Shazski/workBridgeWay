import { RootState } from "../../redux/store";
import Pagination from "../Pagination"
import FindJobCard from "./FindJobCard"
import { useSelector } from 'react-redux';
const FindJobSection = ({ getDataFromChild, page }) => {
    
    const { jobs, jobsCount } = useSelector((state: RootState) => state.job)
    return (
        <div className="lg:ms-32 sm:ms-3 w-full">
            <div>
                <h2 className="font-semibold text-xl font-serif">All Jobs</h2>
                <h1 className="text-sm text-gray-500">Showing <span>{jobs?.length}</span> results</h1>
            </div>
            <div className="md:h-[500px] overflow-y-auto md:w-[600px] scrollbar">
                {jobs && jobs.map((job) => (
                    <>
                        <FindJobCard jobs={job} />
                    </>
                ))

                }

            </div>
            <div className="w-full flex justify-end mb-4">
                <div>
                    <Pagination length={jobsCount?.count || 1} sentToParent={getDataFromChild} page={page} />
                </div>
            </div>
        </div>
    )
}

export default FindJobSection