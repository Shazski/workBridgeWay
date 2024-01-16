import LOGO from "../../assets/images/Logo.png"
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { NavLink } from "react-router-dom";

const JobApplicantsTable = () => {
    return (
        <div className="mt-12 w-full">
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
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
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-green-500 border-green-500 border bg-gray-300 px-4 py-2 rounded-md md:w-32 cursor-pointer">See Application</h1></td>
                                    </tr>
                                    <tr
                                        className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                        <td className="flex whitespace-nowrap py-4 font-semibold"> <span><img src={LOGO} alt="" className="w-20 hidden md:flex rounded-full" /></span> <h1 className="mt-3">sharoon</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="border rounded-xl border-yellow-500 text-yellow-800 px-2 py-1 mt-1 md:w-20">Interview</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500">13 july, 2023</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500 ">Designer</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-green-500 border-green-500 border bg-gray-300 px-4 py-2 rounded-md md:w-32 cursor-pointer">See Application</h1></td>
                                    </tr>
                                    <tr
                                        className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                        <td className="flex whitespace-nowrap py-4 font-semibold"> <span><img src={LOGO} alt="" className="w-20 hidden md:flex rounded-full" /></span> <h1 className="mt-3">sharoon</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="border rounded-xl border-yellow-500 text-yellow-800 px-2 py-1 mt-1 md:w-20">Interview</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500">13 july, 2023</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500 ">Designer</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-green-500 border-green-500 border bg-gray-300 px-4 py-2 rounded-md md:w-32 cursor-pointer">See Application</h1></td>
                                    </tr>
                                    <tr
                                        className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                        <td className="flex whitespace-nowrap py-4 font-semibold"> <span><img src={LOGO} alt="" className="w-20 hidden md:flex rounded-full" /></span> <h1 className="mt-3">sharoon</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="border rounded-xl border-yellow-500 text-yellow-800 px-2 py-1 mt-1 md:w-20">Interview</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500">13 july, 2023</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500 ">Designer</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-green-500 border-green-500 border bg-gray-300 px-4 py-2 rounded-md md:w-32 cursor-pointer">See Application</h1></td>
                                    </tr>
                                    <tr
                                        className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                        <td className="flex whitespace-nowrap py-4 font-semibold"> <span><img src={LOGO} alt="" className="w-20 hidden md:flex rounded-full" /></span> <h1 className="mt-3">sharoon</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="border rounded-xl border-yellow-500 text-yellow-800 px-2 py-1 mt-1 md:w-20">Interview</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500">13 july, 2023</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500 ">Designer</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-green-500 border-green-500 border bg-gray-300 px-4 py-2 rounded-md md:w-32 cursor-pointer">See Application</h1></td>
                                    </tr>
                                    <tr
                                        className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                        <td className="flex whitespace-nowrap py-4 font-semibold"> <span><img src={LOGO} alt="" className="w-20 hidden md:flex rounded-full" /></span> <h1 className="mt-3">sharoon</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="border rounded-xl border-yellow-500 text-yellow-800 px-2 py-1 mt-1 md:w-20">Interview</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500">13 july, 2023</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500 ">Designer</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-green-500 border-green-500 border bg-gray-300 px-4 py-2 rounded-md md:w-32 cursor-pointer">See Application</h1></td>
                                    </tr>
                                    <tr
                                        className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                        <td className="flex whitespace-nowrap py-4 font-semibold"> <span><img src={LOGO} alt="" className="w-20 hidden md:flex rounded-full" /></span> <h1 className="mt-3">sharoon</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="border rounded-xl border-yellow-500 text-yellow-800 px-2 py-1 mt-1 md:w-20">Interview</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500">13 july, 2023</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500 ">Designer</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-green-500 border-green-500 border bg-gray-300 px-4 py-2 rounded-md md:w-32 cursor-pointer">See Application</h1></td>
                                    </tr>
                                    <tr
                                        className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                        <td className="flex whitespace-nowrap py-4 font-semibold"> <span><img src={LOGO} alt="" className="w-20 hidden md:flex rounded-full" /></span> <h1 className="mt-3">sharoon</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="border rounded-xl border-yellow-500 text-yellow-800 px-2 py-1 mt-1 md:w-20">Interview</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500">13 july, 2023</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500 ">Designer</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-green-500 border-green-500 border bg-gray-300 px-4 py-2 rounded-md md:w-32 cursor-pointer">See Application</h1></td>
                                    </tr>
                                    <tr
                                        className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                        <td className="flex whitespace-nowrap py-4 font-semibold"> <span><img src={LOGO} alt="" className="w-20 hidden md:flex rounded-full" /></span> <h1 className="mt-3">sharoon</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="border rounded-xl border-yellow-500 text-yellow-800 px-2 py-1 mt-1 md:w-20">Interview</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500">13 july, 2023</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500 ">Designer</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-green-500 border-green-500 border bg-gray-300 px-4 py-2 rounded-md md:w-32 cursor-pointer">See Application</h1></td>
                                    </tr>
                                    <tr
                                        className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                        <td className="flex whitespace-nowrap py-4 font-semibold"> <span><img src={LOGO} alt="" className="w-20 hidden md:flex rounded-full" /></span> <h1 className="mt-3">sharoon</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="border rounded-xl border-yellow-500 text-yellow-800 px-2 py-1 mt-1 md:w-20">Interview</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500">13 july, 2023</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500 ">Designer</h1></td>
                                        <td className="whitespace-nowrap px-6 py-4"><h1 className="text-green-500 border-green-500 border bg-gray-300 px-4 py-2 rounded-md md:w-32 cursor-pointer">See Application</h1></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="flex justify-between">
                                <h1 className="text-gray-500 text-sm">View 10 Applicants Per Page</h1>
                                <div className="flex me-44 gap-3">
                                    <MdOutlineKeyboardArrowLeft className="text-2xl mt-1" />
                                    <NavLink to="/company-applicants/1" className={({ isActive }) => `rounded-md px-4 py-1  ${isActive ? "bg-green-500 text-white font-bold" : ""}`}>1</NavLink>
                                    <NavLink to="/company-applicants/2" className={({ isActive }) => `rounded-md px-4 py-1  ${isActive ? "bg-green-500 text-white font-bold" : ""}`}>2</NavLink>
                                    <MdOutlineKeyboardArrowRight className="text-2xl mt-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default JobApplicantsTable
