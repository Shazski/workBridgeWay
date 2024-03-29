import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSearchParams, useNavigate } from "react-router-dom"
import { TODO } from "../../config/constants";
const JobSearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate()
  const handleSearch = (e: TODO) => {
    const param = new URLSearchParams(window.location.search)
    const isSearchEmpty = searchParams.get('search')
    setSearch(e.target.value)
    if (e.nativeEvent.inputType === "deleteContentBackward") {

      if (isSearchEmpty?.length === 1) {
        param.delete("search")
        setSearchParams(param)
        return
      }
    }
    param.set("search", e.target.value)
    setSearchParams(param)
  }
  useEffect(() => {
    const searchString = searchParams.get("search")
    if (searchString) {
      setSearch(searchString)
    }
  }, [searchParams])

  return (
    <div>
      <div className="md:flex ms-14 md:ms-36 md:mt-8">
        <div className="bg-white me-10 px-2 mt-6 h-18 relative">
          <FaSearch className="absolute hidden top-7 sm:flex left-4" />
          <input value={search} onChange={(e) => { handleSearch(e) }} type="text" className="border-b-2  md:mx-7 ps-1 py-2 mt-3 outline-none placeholder:text-sm " placeholder="Job title or Keyword" />
          <button onClick={() => navigate(`/jobs?search=${search}`)} className="bg-lightgreen  mb-4 sm:ms-8 md:mb-3 px-3 py-3 mt-6 md:mt-2 md:ms-14 text-white text-center font-semibold rounded-md">Seach my Job</button>
        </div>

      </div>
    </div>
  )
}

export default JobSearchBar
