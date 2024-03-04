import { useNavigate } from "react-router-dom";

const FeatuedJobCard = ({ showApplied = false, job }: { showApplied?: boolean, job: any }) => {

    const navigate = useNavigate()
    return (
        <div>
            <div onClick={() => navigate(`jobs/${job?._id}`)} className={`border border-dashed border-gray-600 w-64 ${showApplied ? "h-72" : "min-h-min py-5"} mt-10  hover:scale-105  transition-all duration-300 ease-in-out hover:cursor-pointer`}>
                <div className="flex">
                    <img src={job?.companyId?.companyLogo} className="w-12 h-12 rounded-full m-4 company-logo" />
                    <h3 className="border text-lightgreen border-lightgreen min-h-min h-8 mt-6 pt-1 px-4 group-hover:border-white">{job?.typeOfEmployment}</h3>
                </div>
                <h1 className="font-serif text-lg ps-5">{job?.jobTitle?.toUpperCase()}</h1>
                <h1 className="font-sans text-gray-500 text-sm ps-5">{job?.companyId?.name} . <span>{job?.companyId?.headOffice}</span></h1>
                <h4 className="text-sm text-gray-500 ps-5 mt-4">{job?.jobDescription}</h4>
                <div className="flex ps-5 gap-3">
                    <h4 className="border text-sm text-lightgreen uppercase bg-blue-100 mt-4 px-2 py-1 rounded-xl ">{job?.category}</h4>
                </div>
                {showApplied ? (
                    <div>
                        <h1 className="ps-6 mt-4"> <span className="font-bold">5 applied</span>  of 10 capacity</h1>
                    </div>
                ) : ""
                }
            </div>
        </div>
    )
}

export default FeatuedJobCard
