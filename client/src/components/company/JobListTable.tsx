import { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../redux/store';
import Pagination from '../Pagination'
import { useDispatch, useSelector } from 'react-redux';
import PropagateLoader from "react-spinners/PropagateLoader";
import { Link } from 'react-router-dom';
import { getJobs, updateJobStatus } from '../../redux/actions/company/CompanyActions';
import { override } from '../../config/constants';
import SearchBar from '../SearchBar';
const JobListTable = () => {

  const formatDate = (dateString: string) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' } as const;
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };
  
  const { jobs, loading,companyJobCount } = useSelector((state: RootState) => state.company)

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
    dispatch(updateJobStatus({ updateData, page, search }))
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
    dispatch(getJobs({page,search}))
  }, [dispatch, refetch, page,search])

  return (
    <div className="mt-4 flex-grow">
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
                        <th scope="col" className="px-6 py-4">Roles</th>
                        <th scope="col" className="px-6 py-4">status</th>
                        <th scope="col" className="px-6 py-4">Date Posted</th>
                        <th scope="col" className="px-6 py-4">Due Date</th>
                        <th scope="col" className="px-6 py-4">Applicants</th>
                        <th scope="col" className="px-6 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        jobs?.map((job, idx) => (
                          <>
                            <tr key={idx} className="border-b  bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                              <td className="flex whitespace-nowrap py-4 font-semibold"><h1 className="mt-3">{job?.jobTitle}</h1></td>
                              <td className="whitespace-nowrap px-6 py-4">{job.status ? <h1 className="border rounded-xl border-green-500 text-green-800 ps-3 py-1 mt-1 md:w-14">Live</h1> : <h1 className="border rounded-xl border-red-500 text-red-800 px-2 py-1 mt-1 md:w-16">Closed</h1>}</td>
                              <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500">{formatDate(String(job?.createdAt))}</h1></td>
                              <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500 ">{formatDate(String(job?.expiry))}</h1></td>
                              <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500 ">{`${job?.applicants?.length}/${job.vacancy}`}</h1></td>
                              <div className='relative'>
                                <td onClick={() => { setIsOption(!isOption), setCurrentJob(idx) }} className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-900 font-semibold text-3xl hover:scale-110 w-16 -z-10 cursor-pointer">...</h1></td>
                                {isOption && idx === currentJob ?
                                  <div className='bg-gray-200   rounded-md top-3.5 absolute flex'>
                                    <h1 onClick={() => updateStatus(job.status ? false : true, String(job?._id))} className={`px-4 py-2 w-16 rounded-lg cursor-pointer ${job.status ? 'text-red-600' : 'text-green-600'}`}>{job.status ? "Close" : "Live"}</h1>
                                    <Link to={`/company/edit-job/${job._id}`} className={`px-4 py-2 text-blue-600  w-16 rounded-lg cursor-pointer font-semibold`}>Edit</Link>
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
              <Pagination length={companyJobCount} page={page} sentToParent={handleChildData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobListTable