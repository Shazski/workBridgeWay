import FindJobCard from "./FindJobCard"
const FindJobSection = () => {
    return (
        <div className="lg:ms-10 md:ms-3 w-full">
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
        </div>
    )
}

export default FindJobSection