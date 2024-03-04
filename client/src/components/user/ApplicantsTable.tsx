import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { Link, NavLink } from 'react-router-dom';
import Pagination from '../Pagination';
import { format } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getUserApplications } from '../../redux/actions/user/userActions';
import { override } from '../../config/constants';
import PropagateLoader from 'react-spinners/PropagateLoader';

const ApplicantsTable = () => {
    const [page, setPage] = useState<number>(1)
    const [getStatus, setGetStatus] = useState<string>('');

    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch<AppDispatch>()
    const handleChildData = (paginationData: { currentPage: number }) => {
        setPage(paginationData.currentPage)
    }
    const { userAppliedJobs, userAppliedJobsCount, loading } = useSelector((state: RootState) => state.job)


    useEffect(() => {
        const stage: string | null = searchParams.get("status")
        dispatch(getUserApplications({ page, getStatus: stage || "" }));
    }, [page, getStatus]);

    const status = {
        pending: "blue",
        inreview: "orange",
        shortlisted: "cyan",
        interview: "yellow",
        rejected: "red",
        accepted: "green"
    }

    const isActive = (sortOption: string) => {
        const currentSort = searchParams.get('status');
        return currentSort === sortOption;
    };

    return (
        <div className="mt-12 flex-grow">
            <div className="flex flex-col h-full">
                <div className='ms-12 flex gap-x-3'>
                    <h1 onClick={() => { setGetStatus(""), setSearchParams("status=all") }}
                        className={`font-semibold cursor-pointer text-gray-600 ${isActive('all') ? 'border-b-4 rounded-sm shadow-lg border-purple-600' : 'hover:border-b-4 hover:rounded-sm border-purple-600'}`}
                    >
                        All
                    </h1>
                    <h1 onClick={() => { setGetStatus("pending"), setSearchParams("status=pending") }}
                        className={`font-semibold cursor-pointer text-gray-600 ${isActive('pending') ? 'border-b-4 rounded-sm shadow-lg border-blue-600' : 'hover:border-b-4 hover:rounded-sm border-blue-600'}`}
                    >
                        Pending
                    </h1>
                    <NavLink to={'?status=inreview'}
                        className={`font-semibold text-gray-600  ${isActive('inreview') ? 'border-b-4 rounded-sm shadow-lg border-orange-600' : 'hover:border-b-4 hover:rounded-sm border-orange-600'}`}
                    >
                        In-Review
                    </NavLink>
                    <NavLink to={'?status=shortlist'}
                        className={`font-semibold text-gray-600  ${isActive('shortlist') ? 'border-b-4 rounded-sm shadow-lg border-cyan-600' : 'hover:border-b-4 hover:rounded-sm border-cyan-600'}`}
                    >
                        Shortlist
                    </NavLink>
                    <NavLink to={'?status=interview'}
                        className={`font-semibold text-gray-600  ${isActive('interview') ? 'border-b-4 rounded-sm shadow-lg border-yellow-600' : 'hover:border-b-4 hover:rounded-sm border-yellow-600'}`}
                    >
                        Interview
                    </NavLink>
                    <NavLink to={'?status=rejected'}
                        className={`font-semibold text-gray-600  ${isActive('rejected') ? 'border-b-4 rounded-sm shadow-lg border-red-600' : 'hover:border-b-4 hover:rounded-sm border-red-600'}`}
                    >
                        Rejected
                    </NavLink>
                    <NavLink to={'?status=accepted'}
                        className={`font-semibold text-gray-600  ${isActive('accepted') ? 'border-b-4 rounded-sm shadow-lg border-green-600' : 'hover:border-b-4 hover:rounded-sm border-green-600'}`}
                    >
                        Acccepted
                    </NavLink>
                </div>
                <div className="sm:mx-6 lg:mx-8 overflow-x-auto scrollbar flex-grow">
                    <div className="inline-block  min-w-full py-2  ">
                        <div className="overflow-x-auto h-[520px] scrollbar">
                            {

                                userAppliedJobs?.length > 0 && !loading ?
                                    <table className="min-w-full border-2 text-left text-sm font-light">
                                        <thead
                                            className="border-b  bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600 sticky -top-1 w-full">
                                            <tr>
                                                <th scope="col" className="px-6 py-4">Company Name</th>
                                                <th scope="col" className="px-6 py-4">Roles</th>
                                                <th scope="col" className="px-6 py-4">Date Applied</th>
                                                <th scope="col" className="px-6 py-4">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                userAppliedJobs?.map((job, idx) => (
                                                    <>
                                                        <tr key={idx}
                                                            className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                                            <div className='flex ms-4'>
                                                                <td className="flex whitespace-nowrap py-4 font-semibold"><img src={job.companyLogo} className=" w-12 rounded-full h-12" /></td>
                                                                <td className="flex whitespace-nowrap py-4 font-semibold"><h1 className="mt-3">{job?.companyName}</h1></td>
                                                            </div>
                                                            <td className="whitespace-nowrap px-3 py-4"><h1 className="mt-3">{job?.jobTitle}</h1></td>
                                                            <td className="whitespace-nowrap  px-3 py-4"><h1 className="text-gray-500">{job?.appliedDate && format(job?.appliedDate, "dd-MM-yyyy")}</h1></td>
                                                            <td className="whitespace-nowrap   px-3 py-4"><h1 className={`border-2 w-min px-3 border-${status[job?.hiringStage]}-600 text-${status[job?.hiringStage]}-600  py-2 rounded-2xl uppercase font-bold   `}>{job?.hiringStage}</h1></td>
                                                        </tr>
                                                    </>

                                                ))
                                            }


                                        </tbody>
                                    </table> : loading ? <>
                                        <PropagateLoader
                                            color={'#197195'}
                                            loading={loading}
                                            cssOverride={override}
                                            size={20}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                    </> : <>
                                        <div className='flex justify-center items-center h-full'>
                                            <h1 className='text-red-600 text-3xl font-serif font-semibold'>No Data Found</h1>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                </div>
                {
                    Number(userAppliedJobsCount) > 0 &&
                    <>
                        <div className='ms-12 mb-2'>
                            <Pagination length={userAppliedJobsCount} page={page} sentToParent={handleChildData} />
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default ApplicantsTable