import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const JobSearchBar = () => {
  return (
    <div>
      <div className="md:flex ms-14 md:ms-36 md:mt-8">
                <div className="bg-white me-10 px-2 mt-6 h-18 relative">
                   <FaSearch className="absolute hidden top-7 sm:flex left-4"/>
                   <FaLocationDot className="absolute hidden sm:flex top-7 left-64"/>
                    <input type="text" className="border-b-2  md:mx-7 ps-1 py-2 mt-3 outline-none placeholder:text-sm " placeholder="Job title or Keyword" />
                    <input type="text" className="relative ms-2 border-b-2 ps-2 md:mx-7 mt-2 py-2 outline-none placeholder:text-sm" placeholder="Bangalore, karnataka" />
                    <button className="bg-green-500 mb-4 sm:ms-8 md:mb-3 px-3 py-3 mt-6 md:mt-2 md:ms-14 text-white text-center font-semibold rounded-sm">Seach my Job</button>
                </div>
                
            </div>
    </div>
  )
}

export default JobSearchBar
