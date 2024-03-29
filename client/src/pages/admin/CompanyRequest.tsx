import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import axios from "axios"
import { ADMIN_BASE_URL, override } from '../../config/constants';
import { BiSolidRightTopArrowCircle } from "react-icons/bi";
import { config } from '../../config/configurations';
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux"
import { ICompanyData } from '../../interface/ICompanyData';
import { AppDispatch } from '../../redux/store';
import { toast } from "react-hot-toast"
import { approveOrRejectCompany } from '../../redux/actions/admin/adminActions';
import Pagination from '../../components/Pagination';
import Modal from '../../components/Modal';
import PropagateLoader from 'react-spinners/PropagateLoader';
const CompanyRequest = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sortParams] = useSearchParams()
  const [isReasonModalOpen, setIsReasonModalOpen] = useState<boolean>(false)
  const [rejectReason, setRejectReason] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);
  const [companyRequest, setCompanyRequest] = useState<ICompanyData[] | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [rejectValue, setRejectValue] = useState<{ email: string, stage: string }>({
    email: "",
    stage: ""
  })

  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();


  const sort = sortParams.get('sort') || "";
  const stage = {
    pending: "blue",
    approved: "green",
    rejected: "red",
    reapplied: "yellow"
  }

  const isActive = (sortOption: string) => {
    const currentSort = new URLSearchParams(location.search).get('sort');
    return currentSort === sortOption;
  };

  const handleSortChange = (sortOption: string) => {
    navigate(`/admin-company-requests?sort=${sortOption}`);
    setCurrentPage(1)
  };

  const getAllRequest = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${ADMIN_BASE_URL}/get-requests`, config);
      setCompanyRequest(response.data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("Error fetching data:", error);
    }
  }


  const filterData = () => {
    if (sort !== "") {
      return companyRequest?.filter((data) => data?.stage === sort)
    } else {
      return companyRequest
    }
  }


  let filteredData = filterData()

  const filterSearch = () => {
    return filteredData?.filter((data) =>
      Object.values(data).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase()))
    )
  }

  if (searchTerm !== "") {
    filteredData = filterSearch()
  }

  const formatDate = (dateString: string) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' } as const;
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };

  const handleApproveOrReject = async (email: string, stage: string,) => {
    const credentials = {
      email: email,
      stage: stage,
      rejectReason: rejectReason || "Rejected"
    }
    await dispatch(approveOrRejectCompany(credentials))
    getAllRequest();
    toast.success(`${stage} successfully`)
    setIsReasonModalOpen(false)
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const lastIndex = currentPage * 10;
  const firstIndex = lastIndex - 10;

  const getDataFromChild = (paginationData: { currentPage: number, recordsPerPage: number, }) => {
    handlePageChange(paginationData.currentPage);
  }
  const handleReject = (email: string) => {
    setIsReasonModalOpen(true)
    const rejectData = {
      email: email,
      stage: "rejected"
    }
    setRejectValue(rejectData)
  }

  useEffect(() => {
    getAllRequest();
  }, [sort]);

  return (
    <div className="flex flex-col h-full poppins">
      <div className="mt-6">
        <h1 className="text-4xl font-bold font-serif text-center">Hello Admin</h1>
      </div>
      <div className="mt-7">
        <div className="flex gap-x-7 ms-12">
          <NavLink to={'?sort=approved'}
            className={`font-semibold ${isActive('approved') ? 'border-b-4 border-lightgreen' : ''}`}
            onClick={() => handleSortChange('approved')}
          >
            Approved
          </NavLink>
          <NavLink to={'?sort=pending'}
            className={`font-semibold ${isActive('pending') ? 'border-b-4 border-lightgreen' : ''}`}
            onClick={() => handleSortChange('pending')}
          >
            Pending
          </NavLink>
          <NavLink to={'?sort=rejected'}
            className={`font-semibold ${isActive('rejected') ? 'border-b-4 border-lightgreen' : ''}`}
            onClick={() => handleSortChange('rejected')}
          >
            Rejected
          </NavLink>
          <NavLink to={'?sort=reapplied'}
            className={`font-semibold ${isActive('reapplied') ? 'border-b-4 border-lightgreen' : ''}`}
            onClick={() => handleSortChange('reapplied')}
          >
            Re-Applied
          </NavLink>
        </div>
        <div className="flex mt-10 justify-between">
          <div>
            <h1 className='font-serif font-semibold text-2xl ms-12'>Company Details</h1>
          </div>
          <div>
            <input className='md:me-44 border py-3 px-3 outline-none' onChange={(e) => setSearchTerm(e.target.value)} type="search" name="search" id="" placeholder="Search company" />
          </div>
        </div>
      </div>
      <div className=" flex-grow">
        <div className="flex flex-col h-full">
          <div className="overflow-auto min-w-full h-44 w-2/2 scrollbar sm:-mx-6 lg:-mx-8 flex-grow">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 ">
              <div className="">
                {
                  filteredData && filteredData.length > 0 ? (
                    <table className="min-w-full text-left text-sm font-light">
                      <thead
                        className="border-b bg-white font-medium sticky top-0 dark:border-neutral-500 dark:bg-neutral-600">
                        <tr className="">
                          <th scope="col" className="ps-12 py-4">Company</th>
                          <th scope="col" className="ps-2 py-4">Applied Date</th>
                          <th scope="col" className=" py-4">linked In</th>
                          <th scope="col" className=" py-4">Phone</th>
                          <th scope="col" className=" py-4">Head Office</th>
                          <th scope="col" className=" py-4">Status</th>
                          <th scope="col" className=" py-4">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          filteredData?.slice(firstIndex, lastIndex).map((value, index) => (
                            <tr key={index}
                              className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                              <td className="flex whitespace-nowrap py-4 font-semibold"> <span><img src={value?.companyLogo ?? ""} alt="" className="w-12 h-10 hidden md:flex rounded-full" /></span> <h1 className="mt-3 ms-2">{value.name}</h1></td>
                              <td className="whitespace-nowrap  py-4"><h1 className="text-gray-500 px-2 py-1 mt-1 md:w-20">{formatDate(String(value?.createdAt))}</h1></td>
                              <td className="whitespace-nowrap  py-4"><a href={`https://${value?.linkedIn}`} target="_blank" rel="noopener noreferrer" className='text-lightgreen text-sm'>{value?.linkedIn}</a></td>
                              <td className="whitespace-nowrap  py-4"><h1 className=" text-gray-900 uppercase">{value?.phone}</h1></td>
                              <td className="whitespace-nowrap  py-4"><h1 className=" text-blue-gray-900">{value?.headOffice || "Not Provided"}</h1></td>
                              <td className="whitespace-nowrap py-4"><h1 className={`text-${stage[value?.stage ?? 0]}-700 uppercase`}>{value?.stage}</h1></td>
                              <td className="whitespace-nowrap  py-4">
                                <button onClick={() => handleApproveOrReject(String(value.email), "approved")} className="text-lg border bg-blue-700 text-white py-2 px-2 rounded-lg"><BiSolidRightTopArrowCircle /></button>
                                <button onClick={() => handleReject(String(value?.email))} className="ms-3 text-lg border bg-red-600 text-white py-2 px-2 rounded-lg"><FaTrash /></button>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  ) : loading ? <PropagateLoader
                    color={'#197195'}
                    loading={loading}
                    cssOverride={override}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  /> : (

                    <h1 className="text-red-600 text-lg font-bold text-center mt-5 font-serif">No Results Found</h1>
                  )
                }
                <div className=' flex justify-end w-full'>
                </div>
              </div>
            </div>
          </div>
          <Pagination length={filteredData?.length ?? 0} sentToParent={getDataFromChild} page={currentPage} />
        </div>
      </div>
      <Modal isVisible={isReasonModalOpen} onClose={() => setIsReasonModalOpen(false)}>
        <input onChange={(e) => setRejectReason(e.target.value)} type="text" className='border py-3 px-2 w-full outline-none' placeholder='State your Reason for rejecting' required />
        <button onClick={() => handleApproveOrReject(rejectValue.email, rejectValue.stage)} className='px-4 py-2 text-red-600 font-semibold bg-gray-200 mt-3 rounded-md'>Reject</button>
      </Modal>
    </div>
  );
};



export default CompanyRequest
