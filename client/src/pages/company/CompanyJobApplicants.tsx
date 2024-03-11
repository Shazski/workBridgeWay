import { useState } from 'react'
import CompanyJobApplicantionTable from '../../components/company/CompanyJobApplicantionTable'
import SearchBar from './../../components/SearchBar';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const CompanyJobApplicants = () => {
  const [search, setSearch] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>("");
  const handleSearch = (searchString: string) => {
    setSearch(searchString)
  }
  const navigate = useNavigate()
  return (
    <>
      <div className="w-full">
        <div className="filter ms-12 mt-6 md:flex justify-between ">
          <div className='flex mt-5'>
            <IoMdArrowRoundBack className="text-3xl cursor-pointer" onClick={() => navigate(`/company/applicants`)} />
            <h1 className="font-serif font-semibold ms-2 text-lg text-blue-gray-900">Applicants </h1>
            <h1 className="font-serif font-semibold text-lg ms-1 text-blue-gray-900">List </h1>
          </div>
          <SearchBar sentSearchStringToParent={handleSearch} />
        </div>
        <div className='flex justify-center'>
        <select onChange={(e) => setDateFilter(e.target.value)} className='px-3 py-2 border rounded-md outline-none'>
          <option value=""defaultChecked hidden>Date Filter</option>
          <option value="increasing">new - old</option>
          <option value="decreasing" >old - new</option>
        </select>
        </div>
        <div className='overflow-x-auto'>
          <CompanyJobApplicantionTable search={search} dateFilter={dateFilter} />
        </div>
      </div>
    </>
  )
}

export default CompanyJobApplicants