import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import SearchBar from '../../components/SearchBar';
import EmployeeListTable from '../../components/company/EmployeeListTable';
import Modal from '../../components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { addEmployee } from '../../redux/actions/company/CompanyActions';
import { makeCompanyErrorDisable } from '../../redux/reducers/company/companySlice';

const EmployeeList = () => {
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ name: string, email: string, password: string, department: string, workType: string }>({ name: "", email: "", password: "", department: "", workType: "" })

  const dispatch = useDispatch<AppDispatch>()
  const { error } = useSelector((state: RootState) => state.company)
  const handleSearch = (searchString: string) => {
    setSearch(searchString)
  }

  const handleAddEmployee = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await dispatch(addEmployee(formData))
    if (res.payload._id) {
      setIsModalOpen(false)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      dispatch(makeCompanyErrorDisable())
    }, 5000)
  }, [error])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.currentTarget
    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <div className="w-full">
      <div className="filter  md:flex justify-evenly  mt-6">
        <div className='w-full ms-20'>
          <h1 className='text-2xl font-semibold font-serif'>Employee List</h1>
        </div>
        <SearchBar sentSearchStringToParent={handleSearch} />
      </div>
      <div>
        <div className='flex justify-end md:me-52 mt-7'>
          <h1 onClick={() => setIsModalOpen(true)} className='bg-lightgreen px-3 py-2 rounded-md font-semibold cursor-pointer text-white'>+ Add Employee</h1>
        </div>
        <EmployeeListTable search={search} />
      </div>
      <Modal isVisible={isModalOpen} onClose={() => setIsModalOpen(false)} >
        {error && <h1 className='text-red-600 font-semibold'>{error}</h1>}
        <form action="" onSubmit={handleAddEmployee}>
          <h1 className="font-semibold text-blue-gray-700">Name</h1>
          <input required onChange={handleChange} name="name" type='text' className="border rounded-md py-2 w-full outline-none" />
          <h1 className="font-semibold text-blue-gray-700">Email</h1>
          <input required onChange={handleChange} name="email" type='email' className="border rounded-md py-2 w-full outline-none" />
          <h1 className="font-semibold text-blue-gray-700">Password</h1>
          <input required onChange={handleChange} name="password" type='password' className="border rounded-md py-2 w-full outline-none" />
          <h1 className="font-semibold text-blue-gray-700">Department</h1>
          <input required onChange={handleChange} name="department" type='text' className="border rounded-md py-2 w-full outline-none" />
          <h1 className="font-semibold text-blue-gray-700">Work Type</h1>
          <select required onChange={handleChange} name="workType"  className="border rounded-md py-2 w-full outline-none" >
            <option value="" hidden defaultChecked>Select Work Type</option>
            <option value="work from home">Work from Home</option>
            <option value="work from office">Work from Office</option>
          </select>
          <div className="flex justify-end me-2 mt-2">
            <button className="px-3 py-2 bg-lightgreen text-white font-semibold rounded-md">Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default EmployeeList