import { useState } from "react";
import LOGO from "../../assets/images/Logo.png"
import Pagination from "../Pagination";

const JobApplicantsTable = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);

   const handleChildData = (paginationData: { currentPage: number}) => {
    setCurrentPage(paginationData.currentPage)
   }
   const lastIndex = currentPage * 10
   const firstIndex = lastIndex - 10;
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
                                        <th scope="col" className="px-6 py-4">Full Name</th>
                                        <th scope="col" className="px-6 py-4">Hiring Stage</th>
                                        <th scope="col" className="px-6 py-4">Applied Date</th>
                                        <th scope="col" className="px-6 py-4">Job Role</th>
                                        <th scope="col" className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                        <td className="flex whitespace-nowrap py-4 font-semibold"> <span><img src={LOGO} alt="" className="w-20 hidden md:flex rounded-full" /></span> <h1 className="mt-3">sharoon</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="border rounded-xl border-yellow-500 text-yellow-800 px-2 py-1 mt-1 md:w-20">Interview</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500">13 july, 2023</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500 ">Designer</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-lightgreen border-lightgreen border bg-gray-200 px-4 py-2 rounded-md md:w-32 cursor-pointer">See Application</h1></td>
                                    </tr>

                                </tbody>
                            </table>
                            <div>
                                <Pagination length={22} page={currentPage} sentToParent={handleChildData}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default JobApplicantsTable
