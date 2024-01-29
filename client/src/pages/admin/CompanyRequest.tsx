import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import axios from "axios"
import { COMPANY_BASE_URL } from '../../config/constants';
import { BiSolidRightTopArrowCircle } from "react-icons/bi";
import { config } from '../../config/configurations';
import { useState, useEffect } from 'react';
import { ICompanyData } from '../../interface/ICompanyData';
const CompanyRequest = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [companyRequest, setCompanyRequest] = useState<ICompanyData[] | null>(null)

    const isActive = (sortOption) => {
        const currentSort = new URLSearchParams(location.search).get('sort');
        return currentSort === sortOption;
    };

    const handleSortChange = (sortOption) => {
        navigate(`/admin-company-requests?sort=${sortOption}`);
    };



    useEffect(() => {
        const getAllRequest = async () => {
            try {
                const response = await axios.get(`${COMPANY_BASE_URL}/get-requests`, config);
                setCompanyRequest(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getAllRequest();
    }, []);
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' } as const;
        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
    };

    return (
        <div>
            <div className="mt-16">
                <h1 className="text-4xl font-bold font-serif text-center">Hello Admin</h1>
            </div>
            <div className="mt-10">
                <div className="flex gap-x-7 ms-12">
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
                </div>
                <div className="flex mt-10 justify-between">
                    <div>
                        <h1 className='font-serif font-semibold text-2xl ms-12'>Company Details</h1>
                    </div>
                    <div>
                        <input className='md:me-44 border py-3 px-3 outline-none' type="search" name="search" id="" placeholder="Search company" />
                    </div>
                </div>
            </div>
            <div className="mt-12 w-full">
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-left text-sm font-light">
                                    <thead
                                        className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                                        <tr>
                                            <th scope="col" className="px-6 py-4">Company</th>
                                            <th scope="col" className="px-6 py-4">Applied Date</th>
                                            <th scope="col" className="px-6 py-4">linked In</th>
                                            <th scope="col" className="px-6 py-4">Status</th>
                                            <th scope="col" className="px-6 py-4">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            companyRequest?.map((value, index) => (
                                                <tr key={index}
                                                    className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                                    <td className="flex whitespace-nowrap py-4 font-semibold"> <span><img src={value?.companyLogo ?? ""} alt="" className="w-20 hidden md:flex rounded-full" /></span> <h1 className="mt-3">{value.name}</h1></td>
                                                    <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500 px-2 py-1 mt-1 md:w-20">{formatDate(value?.createdAt)}</h1></td>
                                                    <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500">{value?.linkedIn}</h1></td>
                                                    <td className="whitespace-nowrap px-6 py-4"><h1 className=" text-blue-700 uppercase">{value?.stage}</h1></td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <button className="text-2xl border bg-blue-700 text-white py-2 px-2 rounded-lg"><BiSolidRightTopArrowCircle/></button>
                                                        <button className="ms-3 text-2xl border bg-red-600 text-white py-2 px-2 rounded-lg"><FaTrash/></button>
                                                        </td>
                                                </tr>
                                            ))
                                        }


                                    </tbody>
                                </table>
                                <div className="flex justify-between mt-auto">
                                    <h1 className="text-gray-500 text-sm">View 10 Applicants Per Page</h1>
                                    {/* <div className="flex me-44 gap-3">
                                    <MdOutlineKeyboardArrowLeft className="text-2xl mt-1" />
                                    <NavLink to="/company-applicants/1" className={({ isActive }) => `rounded-md px-4 py-1  ${isActive ? "bg-lightgreen text-white font-bold" : ""}`}>1</NavLink>
                                    <NavLink to="/company-applicants/2" className={({ isActive }) => `rounded-md px-4 py-1  ${isActive ? "bg-lightgreen text-white font-bold" : ""}`}>2</NavLink>
                                    <MdOutlineKeyboardArrowRight className="text-2xl mt-1" />
                                </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default CompanyRequest
