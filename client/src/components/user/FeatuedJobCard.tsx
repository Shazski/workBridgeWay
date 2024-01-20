import { MdDesignServices } from "react-icons/md";

const FeatuedJobCard = ({ showApplied = false }: { showApplied?: boolean }) => {
    return (
        <div>
            <div className={`border border-dashed border-gray-600 w-64 ${showApplied ? "h-72" : "h-60"} mt-10  hover:scale-95 hover:cursor-pointer`}>
                <div className="flex">
                    <MdDesignServices className="text-4xl m-5 company-logo" />
                    <h3 className="border text-lightgreen border-lightgreen w-24 h-8 mt-6 pt-1 ms-12 ps-4 group-hover:border-white">Full Time</h3>
                </div>
                <h1 className="font-serif text-lg ps-5">Email Marketing</h1>
                <h1 className="font-sans text-gray-500 text-sm ps-5">Company Name .  <span>Location</span></h1>
                <h4 className="text-sm text-gray-500 ps-5 mt-4">Company description about the job but provide only little word by usi...</h4>
                <div className="flex ps-5 gap-3">
                    <h4 className="border text-sm text-yellow-400 bg-yellow-100 mt-4 px-2 py-1 rounded-xl ">Marketing</h4>
                    <h4 className="border text-sm text-lightgreen bg-green-100  mt-4 px-2 py-1 rounded-xl">Design</h4>
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
