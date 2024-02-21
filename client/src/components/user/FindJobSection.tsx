import Pagination from "../Pagination"
import FindJobCard from "./FindJobCard"
const FindJobSection = ({getDataFromChild,page}) => {
    return (
        <div className="lg:ms-32 sm:ms-3 w-full">
            <div>
                <h2 className="font-semibold text-xl font-serif">All Jobs</h2>
                <h1 className="text-sm text-gray-500">Showing <span>73</span> results</h1>
            </div>
            <div>
                <FindJobCard/>
                <FindJobCard/>
                <FindJobCard/>
                <FindJobCard/>
            </div>
            <div className="w-full flex justify-end">
                <div>
            <Pagination length={20} sentToParent={getDataFromChild} page={page}/>
                </div>
            </div>
        </div>
    )
}

export default FindJobSection