import { ChangeEvent } from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ sentSearchStringToParent }: { sentSearchStringToParent?: (value: string) => void }) => {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (sentSearchStringToParent) sentSearchStringToParent(e.target.value)
  }
  return (
    <>
      <div className="flex me-60">
        <CiSearch className="absolute mt-3 ms-3 text-2xl font-bold" />
        <input onChange={(e) => handleChange(e)} type="text" className="border border-gray-400 rounded-md py-3 px-12 outline-none" placeholder="Search" />
      </div>
    </>
  )
}

export default SearchBar