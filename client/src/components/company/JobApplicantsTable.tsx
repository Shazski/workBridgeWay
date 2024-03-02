import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getJobs, updateApplicantStatus } from "../../redux/actions/company/CompanyActions";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const JobApplicantsTable = ({ search = "" }: { search?: string }) => {
    const [page, setPage] = useState<number>(1);
    const dispatch = useDispatch<AppDispatch>()
    const handleChildData = (paginationData: { currentPage: number }) => {
        setPage(paginationData.currentPage)
    }
    const { jobs, companyJobCount } = useSelector((state: RootState) => state.company)
    useEffect(() => {
        dispatch(getJobs({ page, search }))
    }, [dispatch, page, search])

    

    return (
        <div className="mt-2 mx-4 flex-grow">
            <div className="flex flex-col border  h-full">
                <div className="sm:mx-6 lg:mx-8 flex-grow">
                    <div className="inline-block min-w-full py-2  ">
                        <div className="overflow-x-auto h-[450px] scrollbar">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead
                                    className="border-b bg-white sticky top-0 w-full poppins font-medium dark:border-neutral-500 dark:bg-neutral-600">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">Job Title</th>
                                        <th scope="col" className="px-6 py-4">Status</th>
                                        <th scope="col" className="px-6 py-4">Created Date</th>
                                        <th scope="col" className="px-6 py-4">Applied</th>
                                        <th scope="col" className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        jobs?.map((job, idx) => (
                                            <>
                                                <tr key={idx}
                                                    className="border-b poppins bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                                    <td className="flex whitespace-nowrap py-4 font-semibold"><h1 className="mt-3">{job?.jobTitle}</h1></td>
                                                    <td className="whitespace-nowrap px-6 py-4">{job.status ? <h1 className="border rounded-xl border-green-500 text-green-800 ps-3 py-1 mt-1 md:w-14">Live</h1> : <h1 className="border rounded-xl border-red-500 text-red-800 px-2 py-1 mt-1 md:w-16">Closed</h1>}</td>
                                                    <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500">{job?.createdAt && format(job?.createdAt, "dd-MM-yyyy")}</h1></td>
                                                    <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500 ">{`${job?.applicants?.length}/${job.vacancy}`}</h1></td>
                                                    <td className="whitespace-nowrap px-6 py-4"><Link to={`/company/applicants/${job?._id}`} className="text-lightgreen border-lightgreen border bg-gray-200 px-4 py-2 rounded-md md:w-32 cursor-pointer">See Applicants</Link></td>
                                                </tr>
                                            </>

                                        ))
                                    }


                                </tbody>
                            </table>
                            <div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Pagination length={companyJobCount} page={page} sentToParent={handleChildData} />
        </div>
    )

}
export default JobApplicantsTable
