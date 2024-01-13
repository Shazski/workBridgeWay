import SCRATCH from "../../assets/images/scratch.png"
import JobSearchBar from "./JobSearchBar"


const HomeTopSection = () => {
    return (
        <>
            <div className='text-5xl font-serif ms-16 md:ms-36 mt-20 md:mt-20'>
                <h1 className="pt-10">Discover more</h1>
                <h1>than <span className='text-blue-400'>5000+ Jobs</span></h1>
                <img src={SCRATCH} alt="" className="w-80 mt-14 md:mt-20" />
                <h1 className="text-sm mt-3 font-extralight text-gray-500">Great platform for the job seeker that searching for <br /> new career heights and passionate about startups.</h1>
            </div>
            <JobSearchBar/>
            <div className="ms-14 md:ms-36 ">
                    <h1 className="text-xs mt-2 text-gray-400">Popular: UI Designer, UX Researcher, Andriod, Admin</h1>
            </div>
        </>
    )
}

export default HomeTopSection
