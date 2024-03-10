import { useEffect, useState } from 'react';
import Pagination from '../Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { Link, useParams } from 'react-router-dom';
import { getAllCompanyEmployees } from '../../redux/actions/company/CompanyActions';

const EmployeeListTable = ({ search }: { search: string }) => {
  const [page, setPage] = useState<number>(1);
  const [currentEmployee, setCurrentEmployee] = useState<number | null>(null);
  const [isOption, setIsOption] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const handleChildData = (paginationData: { currentPage: number }) => {
    setPage(paginationData.currentPage);
  };

  const { employees, employeesCount } = useSelector((state: RootState) => state.company);

  const statusColor = {
    pending: 'blue',
    inreview: 'orange',
    shortlist: 'cyan',
    interview: 'yellow',
    rejected: 'red',
    accepted: 'green'
  };

  useEffect(() => {
    dispatch(getAllCompanyEmployees({ page, search }))
  }, [search, page])

  return (
    <div className="mt-2 mx-4 flex-grow">
      <div className="flex flex-col border h-full">
        <div className="sm:mx-6 lg:mx-8 flex-grow">
          <div className="inline-block min-w-full py-2">
            <div className="overflow-x-auto h-[450px] scrollbar">
              <table className="min-w-full text-left text-sm font-light">

                <thead className="border-b bg-white poppins font-medium dark:border-neutral-500 dark:bg-neutral-600">
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
                        <h1 className="text-gray-500 ">{employee?.email}</h1>
                      </td>
                      <div className='relative'>
                        <td onClick={() => { setIsOption(!isOption), setCurrentEmployee(idx) }} className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-900 font-semibold text-3xl hover:scale-110 w-16 -z-10 cursor-pointer">...</h1></td>
                        {isOption && currentEmployee === idx ?
                          <div className='bg-gray-200   rounded-md top-3.5 absolute flex'>
                            <h1 className={`px-4 py-2 w-16 rounded-lg cursor-pointer `}>hello</h1>
                            <Link to="dsa" className={`px-4 py-2 text-blue-600  w-16 rounded-lg cursor-pointer font-semibold`}>Edit</Link>
                          </div> : ""
                        }
                      </div>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination length={employeesCount || 1} page={page} sentToParent={handleChildData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeListTable