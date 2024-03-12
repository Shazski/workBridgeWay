
import PropagateLoader from 'react-spinners/PropagateLoader'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { override } from '../../config/constants';
import Pagination from '../../components/Pagination';
import { getAllUsers, updateUserStatus } from '../../redux/actions/admin/adminActions';
import { format, parseISO } from 'date-fns';
import SearchBar from '../../components/SearchBar';
import { updateStatusById } from '../../redux/reducers/admin/adminSlice';
import Modal from '../../components/Modal';
import toast from 'react-hot-toast';

const AllUsers = () => {
  const { loading, usersCount, usersDetails } = useSelector((state: RootState) => state.admin)

  const dispatch = useDispatch<AppDispatch>()

  const [search, setSearch] = useState<string>("")
  const [page, setPage] = useState<number>(1)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOption, setIsOption] = useState<boolean>(false);
  const [currentJob, setCurrentJob] = useState<number | null>(null)
  const [userStatus, setUserStatus] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const updateStatus = (status: boolean, userId: string) => {
    console.log(status, userId, "in update case status and id for managing id")
    const updateData = {
      id: userId,
      status
    }
    dispatch(updateStatusById(userId))
    dispatch(updateUserStatus(updateData))
    setIsOption(false)
    toast.success(`user  ${!status ? "blocked" : "unblocked"}  successfully`)
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
  }, [dispatch, page, search])

  const setBlockDetails = (status: boolean, id: string, user: string) => {
    setUserId(id)
    setUserStatus(status)
    setUserName(user)
  }

  return (
    <>
      <div className='mt-8 flex justify-center me-20'>
        <h1 className='text-2xl font-semibold poppins text-gray-600'>-----All User Details-----</h1>
      </div>
      <div className="mt-12 flex-grow">
        <div className='flex flex-wrap justify-end'>
          <SearchBar sentSearchStringToParent={handleSearchData} />
        </div>
        <div className="flex flex-col">
          <div className="sm:mx-6 lg:mx-8 overflow-x-auto scrollbar flex-grow">
            <div className="overflow-x-auto inline-block min-w-full py-2  ">
              <div className="overflow-x-auto md:h-[500px]  scrollbar">
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
                        className={`border-b bg-white z-40 dark:border-neutral-500 dark:bg-neutral-600 ${isModalOpen ? "" : "sticky"} top-0 w-full`}>
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
                                <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500 ">{`${user?.dob || "Not provided"}`}</h1></td>
                                <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500 ">{user?.createdAt && format(parseISO(String(user?.createdAt)), "dd-MM-yyyy")}</h1></td>
                                <td className="whitespace-nowrap px-6 py-4">{user?.status ? <h1 className="border rounded-xl border-green-500 text-green-800 px-3 py-1 mt-1 md:w-16">Active</h1> : <h1 className="border rounded-xl border-red-500 text-red-800 px-2 py-1 mt-1 md:w-16">Blocked</h1>}</td>
                                <div className='relative'>
                                  <td onClick={() => { setIsOption(!isOption), setCurrentJob(idx) }} className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-900 font-semibold text-3xl hover:scale-110 w-16 -z-10 cursor-pointer">...</h1></td>
                                  {isOption && idx === currentJob ?
                                    <div className='bg-gray-200   rounded-md top-3.5 absolute flex'>
                                      <h1 onClick={() => { setBlockDetails(user.status ? true : false, String(user?._id), String(user.userName)), setIsModalOpen(true) }} className={`px-4 py-2 w-16 rounded-lg cursor-pointer ${user?.status ? 'text-red-600' : 'text-green-600 w-20'}`}>{user?.status ? "Block" : "Unblock"}</h1>
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
      <Modal isVisible={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h1 className="uppercase font-semibold text-center poppins">Do you want to {!userStatus ? "unblock" : "block"}  the User <span className='text-red-700'>{userName}</span></h1>
        <div className="flex gap-x-2 justify-center mt-5">
          <button onClick={() => { updateStatus(userStatus ? false : true, String(userId)), setIsModalOpen(false) }} className="bg-red-600 text-white font-semibold px-3 mt-2 py-1 rounded-md">Yes</button>
          <button onClick={() => { setIsModalOpen(false), setIsOption(false) }} className="bg-blue-600 text-white font-semibold px-4 mt-2 py-1  rounded-md">No</button>
        </div>
      </Modal>
    </>
  )
}

export default AllUsers
