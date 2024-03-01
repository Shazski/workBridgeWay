import { IoMdArrowRoundBack } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { IoIosPhonePortrait } from "react-icons/io";
import LOGO from '../../assets/images/Logo.png'
const ApplicantDetailsSideBar = () => {
  return (
    <>
      <div className="mt-4 flex gap-x-3">
        <IoMdArrowRoundBack className="text-3xl " />
        <h1 className="font-serif font-semibold text-lg text-blue-gray-900">Applicant Details</h1>
      </div>
      <div className="border mt-4">
        <div className="flex gap-x-6 ms-5">
          <div>
            <img src={LOGO} alt="" className="w-16 mt-3 h-16 border rounded-full" />
          </div>
          <div>
            <h1 className="font-serif font-semibold text-lg mt-3 text-blue-gray-900">Jerome Bell</h1>
            <h1 className="text-gray-600 text-sm">Product Designer</h1>
          </div>
        </div>

        <div className="bg-blue-gray-50 mt-4 mb-4 mx-4">
          <div className="flex justify-between border-b-2 mx-3  border-gray-300">
            <h1 className="text-xs py-2">Applied Job</h1>
            <h1 className="text-xs text-gray-600 py-2">2 Days ago</h1>
          </div>
          <div>
            <h1 className="poppins text-sm font-semibold text-md text-blue-gray-900 mx-3 mt-2">Product Development</h1>
            <div className="flex gap-x-1">
              <h1 className="ms-3 text-sm text-gray-700 mt-1 ">Marketing</h1>
              <h1 className="text-sm font-extrabold text-gray-700 mt-1 ">.</h1>
              <h1 className="text-sm text-gray-700 mt-1 mb-4">Full-Time</h1>
            </div>
          </div>
        </div>
        <div className="bg-blue-gray-50 mt-4 mb-4 mx-4">
          <div className="flex justify-between mx-3  border-gray-300">
            <h1 className="text-sm py-2">Stage</h1>
            <h1 className="text-sm text-blue-400 font-semibold py-2">. Interview</h1>
          </div>
          <div>
            <div className="flex gap-x-1">
              <div className="bg-blue-600 w-14 h-2 mt-2 ms-3"></div>
              <div className="bg-blue-600 w-14 h-2 mt-2 "></div>
              <div className="bg-blue-600 w-14 h-2 mt-2 "></div>
              <div className="bg-gray-400 w-14 h-2 mt-2 me-3 mb-3"></div>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-x-2 h-full">
          <div className="border-2 w-5/6  ms-4 flex justify-center h-full py-1 ">
            <h1 className="text-lightgreen font-bold">Schedule Interview</h1>
          </div>
          <div className="border-2 w-1/6  flex me-4 text-lightgreen text-xl justify-center h-full py-1.5 mb-4">
            <h1><MdMessage /></h1>
          </div>
        </div>
        <hr className="mx-4" />
        <div>
          <h1 className="text-lg font-semibold text-blue-gray-800 mx-4 mt-3 poppins">Contact</h1>
        </div>
        <div className="flex mt-5 gap-x-3 ms-4 text-gray-600">
          <MdEmail/>
          <h1 className="text-sm">Email</h1>
        </div>
        <h1 className="mx-11 text-sm">jerome@gmail.com</h1>
        <div className="flex mt-5 gap-x-3 ms-4 text-gray-600">
          <IoIosPhonePortrait/>
          <h1 className="text-sm">Phone</h1>
        </div>
        <h1 className="mx-11 text-sm">8129199874</h1>
      </div>
    </>
  )
}

export default ApplicantDetailsSideBar