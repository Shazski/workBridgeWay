import { useState } from 'react'
import CompanyJobApplicantionTable from '../../components/company/CompanyJobApplicantionTable'
import SearchBar from './../../components/SearchBar';

const CompanyJobApplicants = () => {
  const [search, setSearch] = useState<string>("");
  const handleSearch = (searchString: string) => {
    setSearch(searchString)
  }
  return (
    <div className="w-full">
      <div className="filter  md:flex justify-around mt-6">
        <SearchBar sentSearchStringToParent={handleSearch} />
      </div>
      <div>
        <CompanyJobApplicantionTable search={search} />
      </div>
    </div>
  )
}

export default CompanyJobApplicants