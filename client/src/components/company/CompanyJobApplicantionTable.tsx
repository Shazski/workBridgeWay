import { useEffect, useState } from 'react'
import Pagination from '../Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getJobs } from '../../redux/actions/company/CompanyActions';
import { Link, useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

const CompanyJobApplicantionTable = ({ search }: { search: string }) => {
    const [page, setPage] = useState<number>(1);
    const [jobApplicants, setJobApplicants] = useState<any>({});

    const dispatch = useDispatch<AppDispatch>()
    const handleChildData = (paginationData: { currentPage: number }) => {
        setPage(paginationData.currentPage)
    }
    const { id } = useParams()
    const { jobs, companyJobCount } = useSelector((state: RootState) => state.company)
    useEffect(() => {
        dispatch(getJobs({ page, search }))
    }, [dispatch, page, search, id])

    useEffect(() => {
        setJobApplicants(() => jobs?.filter((job) => job?._id === id))
        console.log(jobs?.filter((job) => job?._id === id))
    }, [id])

    const statusColor = {
        pending: "blue",
        inreview: "orange",
        shortlist: "cyan",
        interview: "yellow",
        rejected: "red",
        accepted: "green"
    }

    return (
        <div className="mt-12 flex-grow">
            <div className="flex flex-col h-full">
                <div className="sm:mx-6 lg:mx-8 flex-grow">
                    <div className="inline-block min-w-full py-2  ">
                        <div className="overflow-x-auto h-[450px]">
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
                                        jobApplicants[0]?.applicants?.map((applicant, idx) => (
                                            <>
                                                <tr key={idx}
                                                    className="border-b poppins bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                                    <td className="flex whitespace-nowrap py-4 font-semibold"><h1 className="mt-3">{applicant?.name}</h1></td>
                                                    <td className="whitespace-nowrap px-6 py-4"><h1 className={`mt-3 border-2 py-1 px-3 md:w-24 rounded-2xl uppercase font-bold  border-${statusColor[applicant?.hiringStage]}-600 text-${statusColor[applicant?.hiringStage]}-600`}>{applicant?.hiringStage}</h1></td>
                                                    <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500">{applicant?.appliedDate && format(applicant?.appliedDate, "dd-MM-yyyy")}</h1></td>
                                                    <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500 ">{jobApplicants[0]?.jobTitle}</h1></td>
                                                    <td className="whitespace-nowrap px-6 py-4"><Link to={`/company/applicants/${applicant?._id}`} className="text-lightgreen border-lightgreen border bg-gray-200 px-4 py-2 rounded-md md:w-32 cursor-pointer">See Application</Link></td>
                                                </tr>
                                            </>

                                        ))
                                    }


                                </tbody>
                            </table>
                            <div>
                            </div>
                        </div>
                        <Pagination length={companyJobCount} page={page} sentToParent={handleChildData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyJobApplicantionTable