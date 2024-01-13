import SCRATCH from "../../assets/images/scratch.png"
import JobSearchBar from "./JobSearchBar"
const FindJobTopSection = () => {
    return (
        <div>
            <div className="mt-20 flex justify-center flex-col items-center">
                <div className="md:mt-24 mt-12 ms-14">
                    <h1 className="text-3xl md:text-5xl font-serif">Find your  <span className="text-blue-400">dream job</span> </h1>
                    <img src={SCRATCH} alt="" className="w-36 md:w-56 ms-36 md:ms-52" />
                </div>
                <h1 className="text-xs md:text-lg text-gray-600 ms-12 mt-5">Find your next career at companies like HubSpot, Nike, and Dropbox</h1>
            </div>
            <div className=" flex justify-center">
                <JobSearchBar />
            </div>
            <div className="ms-14 md:ms-[670px]">
                <h1 className="text-xs mt-2 text-gray-400">Popular: UI Designer, UX Researcher, Andriod, Admin</h1>
            </div>
        </div>
    )
}

export default FindJobTopSection
