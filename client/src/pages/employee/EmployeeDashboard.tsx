import { Link } from "react-router-dom"
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { getEmployeeSchedules } from "../../redux/actions/employee/employeeActions";
const EmployeeDashboard = () => {

  const { user } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()


  useEffect(() => {
    dispatch(getEmployeeSchedules())
  },[])
  return (
    <>
      <div className="flex justify-between bg-white sticky top-0 items-center h-16 border-b-2">
        <div className="ms-12">
          <h1 className="text-2xl font-serif font-semibold">DashBoard</h1>
        </div>
        <div className="md:me-36 me-3">
          <Link className="border border-blue-gray-100 px-4 py-2 text-lightgreen font-medium font-serif" to={'/'}>Request for Leave</Link>
        </div>
      </div>
      <h1 className="text-2xl font-semibold font-serif text-center mt-12">Hello {user?.userName}</h1>
      <div className="flex items-center  w-full  ms-12 mt-20">
        <div className="border-2 px-4 py-2 w-3/6 h-2/6">
          <div className="border-b mt-2">
            <h1 className="font-serif font-semibold">Upcoming Interview</h1>
          </div>
          <div className="border-b mt-6 flex justify-between">
            <h1>Today, 26 November</h1>
            <div className="flex text-3xl font-semibold">
              <MdKeyboardArrowLeft className="cursor-pointer" />
              <MdKeyboardArrowRight className="cursor-pointer" />
            </div>
          </div>
          <div className="flex w-full mt-7">
            <div className="flex gap-y-4 w-1/6 flex-col">
              <h1 className="text-xs">10 Am</h1 >
              <h1 className="text-xs">10 Am</h1 >
              <h1 className="text-xs">10 Am</h1 >
            </div>
            <div className="border 4/6 flex px-4 py-2 rounded-lg gap-x-5 bg-light-blue-50">
              <img src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png" alt="" className="w-12 h-12 rounded-full" />
              <div>
                <h1 className="font-serif ">Applicant Name</h1>
                <h1 className="text-xs font-semibold">Written Test</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="border">
          <div className="border">
            asd
          </div>
        </div>
      </div>
    </>
  )
}

export default EmployeeDashboard