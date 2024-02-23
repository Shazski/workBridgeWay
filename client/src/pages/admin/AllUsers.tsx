
import PropagateLoader from 'react-spinners/PropagateLoader'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { override } from '../../config/constants';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import { getAllUsers } from '../../redux/actions/admin/adminActions';
import { format, parseISO } from 'date-fns';
import SearchBar from '../../components/SearchBar';

const AllUsers = () => {
  const { loading, usersCount, usersDetails } = useSelector((state: RootState) => state.admin)

  const dispatch = useDispatch<AppDispatch>()

  const [search, setSearch] = useState<string>("")
  const [page, setPage] = useState<number>(1)
  const [isOption, setIsOption] = useState<boolean>(false);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [currentJob, setCurrentJob] = useState<number | null>(null)
  const updateStatus = (status: boolean, jobId: string) => {
    setRefetch(!refetch)
    const updateData = {
      status,
      id: jobId
    }

    setIsOption(false)
  }

  const handleChildData = ({ currentPage }) => {
    setPage(currentPage)
    console.log(currentPage)
  }

  const handleSearchData = (value) => {
    setSearch(value)

  }

  useEffect(() => {
    dispatch(getAllUsers({ search, page }))
  }, [dispatch, refetch, page, search])
  return (
    <>
    <div className='mt-8 flex justify-center me-20'>
      <h1 className='text-2xl font-semibold poppins text-gray-600'>-----All User Details-----</h1>
    </div>
    <div className="mt-12 flex-grow">
      <div className='flex flex-wrap justify-end'>
        <SearchBar  sentSearchStringToParent={handleSearchData}/>
      </div>
      <div className="flex flex-col">
        <div className="sm:mx-6 lg:mx-8 flex-grow">
          <div className="inline-block min-w-full py-2  ">
            <div className="overflow-x-auto md:h-[500px] scrollbar">
              {
                loading ? <PropagateLoader
                  color={'#197195'}
                  loading={loading}
                  cssOverride={override}
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                /> : <>
                  <table className="min-w-full text-left text-sm font-light w-full">
                    <thead
                      className="border-b bg-white z-40 dark:border-neutral-500 dark:bg-neutral-600 sticky top-0 w-full">
                      <tr className='w-full'>
                        <th scope="col" className="px-6 py-4">Email</th>
                        <th scope="col" className="px-6 py-4">User Name</th>
                        <th scope="col" className="px-6 py-4">Phone</th>
                        <th scope="col" className="px-6 py-4">Dob</th>
                        <th scope="col" className="px-6 py-4">Joined</th>
                        <th scope="col" className="px-6 py-4">Status</th>
                        <th scope="col" className="px-6 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        usersDetails?.map((user, idx) => (
                          <>
                            <tr key={idx} className="border-b  bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                              <td className="flex whitespace-nowrap py-4 font-semibold"><h1 className="mt-3">{user?.email}</h1></td>
                              <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500 ">{`${user?.userName}`}</h1></td>
                              <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500 ">{`${user?.phone}`}</h1></td>
                              <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500 ">{`${user?.dob}`}</h1></td>
                              <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500 ">{user?.createdAt && format(parseISO(String(user?.createdAt)), "dd-MM-yyyy")}</h1></td>
                              <td className="whitespace-nowrap px-6 py-4">{user?.status ? <h1 className="border rounded-xl border-green-500 text-green-800 ps-3 py-1 mt-1 md:w-16">Active</h1> : <h1 className="border rounded-xl border-red-500 text-red-800 px-2 py-1 mt-1 md:w-16">Blocked</h1>}</td>
                              <div className='relative'>
                                <td onClick={() => { setIsOption(!isOption), setCurrentJob(idx) }} className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-900 font-semibold text-3xl hover:scale-110 w-16 -z-10 cursor-pointer">...</h1></td>
                                {isOption && idx === currentJob ?
                                  <div className='bg-gray-200   rounded-md top-3.5 absolute flex'>
                                    <h1 onClick={() => updateStatus(user.status ? false : true, String(user?._id))} className={`px-4 py-2 w-16 rounded-lg cursor-pointer ${user?.status ? 'text-red-600' : 'text-green-600'}`}>{user?.status ? "Block" : "Unblock"}</h1>
                                    <Link to={`/company/edit-job/${user._id}`} className={`px-4 py-2 text-blue-600  w-16 rounded-lg cursor-pointer font-semibold`}>Edit</Link>
                                  </div> : ""
                                }
                              </div>
                            </tr>
                          </>
                        ))
                      }



                    </tbody>
                  </table>
                </>
              }
            </div>
            <div>
              <Pagination length={usersCount} page={page} sentToParent={handleChildData} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default AllUsers
