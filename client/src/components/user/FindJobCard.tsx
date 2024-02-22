import JobCategogyBtn from './JobCategogyBtn'
const FindJobCard = ({ showCatTag = true, showApplied = true, jobs }: { showCatTag?: boolean, showApplied?: boolean, jobs?:any }) => {
    return (
        <div className="border md:flex md:h-28 w-full md:w-full mt-8 md:justify-center">
            <div className="md:mt-4">
                <img src={jobs?.companyId?.companyLogo} alt="" className="w-32 " />
            </div>
            <div className={`md:mt-4 ms-2 ${showCatTag ? "" : "md:mt-7"}`}>
                <h1 className={`font-semibold`}>{jobs?.jobTitle?.toLowerCase()}</h1>
                <h3 className="text-gray-500 text-sm">HeadOffice . {jobs?.companyId?.headOffice} </h3>
                <div className="flex gap-3 md:mt-3">
                    {
                        showCatTag ? <>

                            <JobCategogyBtn category={jobs?.category} />
                        </> : <>
                        </>
                    }
                </div>
            </div>
            <div className="lg:ms-24 ms-2">
                <button className="bg-lightgreen text-white font-semibold px-10 py-2 md:mt-6 mt-4 me-4 rounded-sm">Apply</button>
                {
                    showApplied ? <h1 className="text-xs mt-2 text-gray-500">5 applied of 10 capacity</h1> : <></>
                }
            </div>
        </div>
    )
}

export default FindJobCard
