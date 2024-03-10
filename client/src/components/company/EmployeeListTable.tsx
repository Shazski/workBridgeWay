import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Pagination from '../Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { EditEmployeeData, getAllCompanyEmployees } from '../../redux/actions/company/CompanyActions';
import { IEmployee } from '../../interface/IEmployeeData';
import Modal from '../Modal';

const EmployeeListTable = ({ search }: { search: string }) => {
  const [page, setPage] = useState<number>(1);
  const [currentEmployee, setCurrentEmployee] = useState<number | null>(null);
  const [isOption, setIsOption] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editEmployeeData, setEditEmployeeData] = useState<IEmployee | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleChildData = (paginationData: { currentPage: number }) => {
    setPage(paginationData.currentPage);
  };

  const { employees, employeesCount, error } = useSelector((state: RootState) => state.company);


  useEffect(() => {
    dispatch(getAllCompanyEmployees({ page, search }))
  }, [search, page])

  const handleEditEmployee = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editEmployeeData)
      dispatch(EditEmployeeData(editEmployeeData))
    setIsModalOpen(false)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;
    setEditEmployeeData((prevData: IEmployee | null) => {
      return {
        ...prevData,
        [name]: value
      } as IEmployee | null;
    });
  };;

  const handleEditClick = (employeeId: string) => {
    const employeeDetails = employees?.find((emp) => emp._id === employeeId)
    if (employeeDetails)
      setEditEmployeeData(employeeDetails)
    setIsModalOpen(true)
  }
  return (
    <div className="mt-2 mx-4 flex-grow">
      <div className="flex flex-col border h-full">
        <div className="sm:mx-6 lg:mx-8 flex-grow">
          <div className="inline-block min-w-full py-2">
            <div className="overflow-x-auto h-[400px] scrollbar">
              <table className="min-w-full text-left text-sm font-light">

                <thead className="border-b bg-white poppins sticky top-0 w-full z-50 font-medium dark:border-neutral-500 dark:bg-neutral-600">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      email
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Department
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Work Type
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employees?.map((employee, idx) => (
                    <tr
                      key={idx}
                      className="border-b poppins text-xs bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
                    >
                      <td className="flex whitespace-nowrap py-4 px-6 font-semibold">
                        <h1 className="mt-3">{employee?.name}</h1>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <h1
                          className={`mt-3   py-1 px-3 w-min rounded-2xl  font-bold   `}
                        >
                          {employee?.email}
                        </h1>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <h1 className="text-gray-500">
                          {employee?.department}
                        </h1>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <h1 className="text-gray-500 border border-lightgreen w-min px-2 py-1 rounded-md">{employee?.workType}</h1>
                      </td>
                      <div className='relative'>
                        <td onClick={() => { setIsOption(!isOption), setCurrentEmployee(idx) }} className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-900 font-semibold text-3xl hover:scale-110 w-16 -z-10 cursor-pointer">...</h1></td>
                        {isOption && currentEmployee === idx ?
                          <div className='bg-gray-200   rounded-md top-3.5 absolute flex'>
                            <h1 onClick={() => handleEditClick(employee?._id)} className={`px-4 py-2 text-blue-600  w-16 rounded-lg cursor-pointer font-semibold`}>Edit</h1>
                          </div> : ""
                        }
                      </div>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Modal isVisible={isModalOpen} onClose={() => setIsModalOpen(false)} >
          {error && <h1 className='text-red-600 font-semibold'>{error}</h1>}
          <form action="" onSubmit={handleEditEmployee}>
            <h1 className="font-semibold text-blue-gray-700">Name</h1>
            <input required onChange={handleChange} name="name" type='text' value={editEmployeeData?.name} className="border rounded-md py-2 w-full outline-none" />
            <h1 className="font-semibold text-blue-gray-700">Department</h1>
            <input required onChange={handleChange} name="department" type='text' value={editEmployeeData?.department} className="border rounded-md py-2 w-full outline-none" />
            <h1 className="font-semibold text-blue-gray-700">Work Type</h1>
            <select required onChange={handleChange} name="workType" className="border rounded-md py-2 w-full outline-none" >
              <option value={editEmployeeData?.workType} hidden defaultChecked>{editEmployeeData?.workType}</option>
              <option value="work from home">Work from Home</option>
              <option value="work from office">Work from Office</option>
            </select>
            <div className="flex justify-end me-2 mt-2">
              <button className="px-3 py-2 bg-lightgreen text-white font-semibold rounded-md">Submit</button>
            </div>
          </form>
        </Modal>
      </div>
      <Pagination length={employeesCount || 1} page={page} sentToParent={handleChildData} />
    </div>
  );
};

export default EmployeeListTable