import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { format } from 'date-fns';
import { getUserApplications } from '../../redux/actions/user/userActions';

const ApplicantsTable = () => {
    const [page, setPage] = useState<number>(1);
    const dispatch = useDispatch<AppDispatch>()
    const handleChildData = (paginationData: { currentPage: number }) => {
        setPage(paginationData.currentPage)
    }
    const { jobs, companyJobCount } = useSelector((state: RootState) => state.company)
    const { userAppliedJobs } = useSelector((state: RootState) => state.job)
    useEffect(() => {
        dispatch(getUserApplications())
    }, [])

    useEffect(() => {
        console.log(userAppliedJobs, "user data recieved")
    }, [])

    const status = {
        pending: "blue",
        inreview:"orange-600",
        shortlist:"cyan-600",
        interview:"yellow-600",
        rejected:"red-600",
        accepted:"green-600"
    }


    return (
        <div className="mt-12 flex-grow">
            <div className="flex flex-col h-full">
                <div className="sm:mx-6 lg:mx-8 flex-grow">
                    <div className="inline-block min-w-full py-2  ">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead
                                    className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">Company Name</th>
                                        <th scope="col" className="px-6 py-4">Roles</th>
                                        <th scope="col" className="px-6 py-4">Date Applied</th>
                                        <th scope="col" className="px-6 py-4">Status</th>
                                        <th scope="col" className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userAppliedJobs?.map((job, idx) => (
                                            <>
                                                <tr key={idx}
                                                    className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                                    <td className="flex whitespace-nowrap py-4 font-semibold"><h1 className="mt-3">{job?.companyId.name}</h1></td>
                                                    <td className="whitespace-nowrap px-6 py-4">{job.status ? <h1 className="border rounded-xl border-green-500 text-green-800 ps-3 py-1 mt-1 md:w-14">Live</h1> : <h1 className="border rounded-xl border-red-500 text-red-800 px-2 py-1 mt-1 md:w-16">Closed</h1>}</td>
                                                    <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500">{job?.createdAt && format(job?.createdAt, "dd-MM-yyyy")}</h1></td>
                                                    <td className="whitespace-nowrap px-6 py-4"><h1 className={`text-white px-3 md:w-24 py-2 rounded-md uppercase font-bold bg-${status[job?.applicants?.hiringStage]}-600 border-2`}>{job?.applicants?.hiringStage}</h1></td>
                                                    <td className="whitespace-nowrap px-6 py-4"><Link to={`/company/applicants/${job?._id}`} className="text-lightgreen border-lightgreen border bg-gray-200 px-4 py-2 rounded-md md:w-32 cursor-pointer">See Applicants</Link></td>
                                                </tr>
                                            </>

                                        ))
                                    }


                                </tbody>
                            </table>
                            <div>
                                <Pagination length={companyJobCount} page={page} sentToParent={handleChildData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApplicantsTable