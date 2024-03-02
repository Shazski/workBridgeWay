import { useEffect, useState } from 'react'
import Pagination from '../Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getJobById, updateApplicantStatus } from '../../redux/actions/company/CompanyActions';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';

const CompanyJobApplicantionTable = ({ search }: { search: string }) => {
  const [page, setPage] = useState<number>(1);
  const [filteredData, setFilteredData] = useState<any>([]);
  const dispatch = useDispatch<AppDispatch>()
  const handleChildData = (paginationData: { currentPage: number }) => {
    setPage(paginationData.currentPage)
  }
  const { id } = useParams()

  useEffect(() => {
    console.log(id,"params id")
    dispatch(getJobById(id))
  }, [dispatch, page, id])

  const { editJob } = useSelector((state: RootState) => state.company)

  let lastIndex
  let firstIndex

  useEffect(() => {
    lastIndex = page * 10;
    firstIndex = lastIndex - 10;
  }, [page])

  const statusColor = {
    pending: "blue",
    inreview: "orange",
    shortlist: "cyan",
    interview: "yellow",
    rejected: "red",
    accepted: "green"
  }


  useEffect(() => {
    let filteredApplicants: never[] = [];
    if (editJob) {
      filteredApplicants = (editJob?.applicants || []).filter((applicant) =>
        Object.values(applicant).some((value) =>
          value && typeof value === 'string' && value.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    setFilteredData(filteredApplicants)
  }, [editJob])

  const handleUpdateStatus = (userId,jobId, status) => {
    const updateData = {
      applicantId:userId,
      jobId:jobId,
      status:status
    }
    dispatch(updateApplicantStatus(updateData))
  }

  return (
    <div className="mt-12 flex-grow">
      <div className="flex flex-col h-full">
        <div className="sm:mx-6 lg:mx-8 flex-grow">
          <div className="inline-block min-w-full py-2  ">
            <div className="overflow-x-auto h-[450px]">
              {
                filteredData && filteredData.length > 0 ?
                  <table className="min-w-full text-left text-sm font-light">
                    <thead
                      className="border-b bg-white poppins font-medium dark:border-neutral-500 dark:bg-neutral-600">
                      <tr>
                        <th scope="col" className="px-6 py-4">Full Name</th>
                        <th scope="col" className="px-6 py-4">Hiring Stage</th>
                        <th scope="col" className="px-6 py-4">Applied Date </th>
                        <th scope="col" className="px-6 py-4">Job Role</th>
                        <th scope="col" className="px-6 py-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        filteredData.slice(firstIndex, lastIndex).map((applicant, idx) => {
                          return <tr key={idx}
                            className="border-b poppins bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                            <td className="flex whitespace-nowrap py-4 font-semibold"><h1 className="mt-3">{applicant?.name}</h1></td>
                            <td className="whitespace-nowrap px-6 py-4"><h1 className={`mt-3 border-2 text-${statusColor[applicant?.hiringStage]}-600 py-1 px-3 md:w-24 rounded-2xl uppercase font-bold  border-${statusColor[applicant?.hiringStage]}-600 `}>{applicant?.hiringStage}</h1></td>
                            <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500">{applicant?.appliedDate && format(applicant?.appliedDate, "dd-MM-yyyy")}</h1></td>
                            <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500 ">{editJob?.jobTitle}</h1></td>
                            <td onClick={() => handleUpdateStatus(applicant?.applicantId,editJob?._id,"inreview")} className="whitespace-nowrap px-6 py-4"><Link to={`/company/applicants/${editJob?._id}/${applicant?.applicantId}/profile`} className="text-lightgreen border-lightgreen border bg-gray-200 px-4 py-2 rounded-md md:w-32 cursor-pointer">See Application</Link></td>
                          </tr>
                        })
                      }
                    </tbody>
                  </table>

                  : <>
                    <div className='flex justify-center items-center h-full'>
                      <div className='text-red-600 flex gap-x-3 text-3xl duration-500 font-serif font-semibold'><h1 className='animate-bounce'>No</h1> <h1 className='animate-bounce'>Data</h1> <h1 className='animate-bounce'>Found</h1></div>
                    </div>
                  </>
              }

              <div>
              </div>
            </div>
            <Pagination length={filteredData?.length || 0} page={page} sentToParent={handleChildData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyJobApplicantionTable