import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { getAllUserDetails, getEmployeeSchedules } from "../../redux/actions/employee/employeeActions";
import PropagateLoader from "react-spinners/PropagateLoader";
import { TODO, override } from "../../config/constants";
const EmployeeDashboard = () => {

  const { user } = useSelector((state: RootState) => state.user)
  const { scheduleData, loading } = useSelector((state: RootState) => state.job)
  const dispatch = useDispatch<AppDispatch>()

  const [idx, setIdx] = useState<number>(0);
  const [sortedScheduleData, setSortedScheduleData] = useState<TODO>([]);

  useEffect(() => {
    dispatch(getEmployeeSchedules())

  }, [])

  useEffect(() => {
    dispatch(getAllUserDetails())
  }, [])


  const { allUsers } = useSelector((state: RootState) => state.job)

  const formatAdjustedTimeToAMPM = (time24HourFormat: string, adjustmentHours: number): string => {
    if (!time24HourFormat) return "";

    const timeIn24HourFormat = new Date(`2000-01-01T${time24HourFormat}:00Z`);
    timeIn24HourFormat.setHours(timeIn24HourFormat.getHours() + adjustmentHours);
    timeIn24HourFormat.setMinutes(0);

    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' };
    return timeIn24HourFormat.toLocaleTimeString(undefined, options);
  };
  const formatTimeToAMPM = (time24HourFormat: string): string => {
    if (!time24HourFormat) return "";

    const timeIn24HourFormat = new Date(`2000-01-01T${time24HourFormat}:00Z`);
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' };
    return timeIn24HourFormat.toLocaleTimeString(undefined, options);
  };
  const calculateDateDifference = (date1: Date, date2: Date): number => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
    return diffDays;
  };

  const todayDate = new Date();
  const scheduleDate = new Date(sortedScheduleData?.[idx]?.date);

  const dateDifference = calculateDateDifference(todayDate, scheduleDate);

  const isScheduleDataValid = Array.isArray(sortedScheduleData);
  let sortedData
  useEffect(() => {
    if (Array.isArray(scheduleData)) {
      sortedData = [...scheduleData]?.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB;
      });
      setSortedScheduleData(sortedData);
    }
  }, [scheduleData]);

  const currentApplicantId = sortedScheduleData?.[idx]?.applicantId;
  const currentApplicant = allUsers?.find(user => user._id === currentApplicantId);

  return (
    <>
      <div className="flex justify-between bg-white sticky top-0 items-center h-16 border-b-2">
        <div className="ms-12">
          <h1 className="text-2xl font-serif font-semibold">DashBoard</h1>
        </div>
        {/* <div className="md:me-36 me-3">
          <Link className="border border-blue-gray-100 px-4 py-2 text-lightgreen font-medium font-serif" to={'/'}>Request for Leave</Link>
        </div> */}
      </div>
      <h1 className="text-2xl font-semibold font-serif text-center mt-12">Hello {user?.userName}</h1>
      <div className="flex items-center  w-full  ms-12 mt-12">
        <div className="border-2 px-4 py-2 w-3/6 h-2/6 ">
          <div className="border-b mt-2">
            <h1 className="font-serif mb-2 font-semibold">Upcoming Interview</h1>
          </div>
          <div className="border-b mt-6 flex justify-between">
            <h1>{dateDifference === 0 ? 'Today' : `${dateDifference} days left`}, {new Date(sortedScheduleData?.[idx]?.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</h1>
            <div className="flex text-3xl font-semibold">
              <MdKeyboardArrowLeft className={`cursor-pointer ${idx === 0 ?'hidden': 'block'}`} onClick={() => idx > 0 && setIdx(idx - 1)} />
              <MdKeyboardArrowRight className={`cursor-pointer ${idx === sortedScheduleData?.length - 1 ?'hidden': 'block'}`} onClick={() => idx < (sortedScheduleData?.length - 1) && setIdx(idx + 1)} />
            </div>
          </div>
          <div className="flex w-full mt-7">
            {isScheduleDataValid && (
              <div className="flex gap-y-4 w-1/6 flex-col">
                <h1 className="text-xs">{formatAdjustedTimeToAMPM(sortedScheduleData?.[idx]?.time, -1)}</h1>
                <h1 className="text-xs">{formatTimeToAMPM(sortedScheduleData?.[idx]?.time)} <span className="ms-2">"-------"</span>  </h1>
                <h1 className="text-xs">{formatAdjustedTimeToAMPM(sortedScheduleData?.[idx]?.time, 1)}</h1>
              </div>
            )}
            <div className="border 4/6 flex px-4 py-2 h-16 mt-2 ms-4 rounded-lg gap-x-5 bg-light-blue-50">
              <img src={currentApplicant?.profilePic} alt="" className="w-12 h-12 rounded-full" />
              <div className="pe-20 ps-5">
                <h1 className="font-serif ">{currentApplicant?.userName}</h1>
                <h1 className="text-xs font-semibold">{sortedScheduleData?.[idx]?.testType}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="border">
          <div className="border">
            
          </div>
        </div>

      </div>
      <div className="flex flex-col overflow-x-auto mt-5">
        <div className="sm:mx-6 lg:mx-8 overflow-x-auto flex-grow">
          <div className="inline-block overflow-x-auto min-w-full py-2  ">
            <div className="overflow-x-auto md:h-[250px] duration-500 scrollbar">
              {scheduleData && scheduleData?.length > 0 ?
                loading ? <PropagateLoader
                  color={'#197195'}
                  loading={loading}
                  cssOverride={override}
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                /> : <>
                  <table className="min-w-full text-left text-sm font-light w-full">
                    <thead
                      className="border-b bg-white z-40 text-sm dark:border-neutral-500 dark:bg-neutral-600 sticky top-0 w-full">
                      <tr className='w-full'>
                        <th scope="col" className="px-6 py-4">Applicant Name</th>
                        <th scope="col" className="px-6 py-4">Interview Date</th>
                        <th scope="col" className="px-6 py-4">Interview Time</th>
                        <th scope="col" className="px-6 py-4">Test Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        sortedScheduleData?.map((schedule, idx) => (
                          <>
                            <tr key={idx} className="border-b text-xs bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                              <td className="flex whitespace-nowrap px-6 py-4 font-semibold"><h1 className="mt-3">{allUsers?.find((user) => user?._id === schedule.applicantId).userName}</h1></td>
                              <td className="whitespace-nowrap px-6 py-4">{new Date(schedule?.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                              <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500">{formatTimeToAMPM(schedule?.time)}</h1></td>
                              <td className="whitespace-nowrap px-6 py-4"><h1 className="text-gray-500 ">{schedule?.testType}</h1></td>
                            </tr>
                          </>
                        ))
                      }



                    </tbody>
                  </table>
                </> : <>
                  <div className='flex justify-center items-center h-full'>
                    <h1 className='text-red-600 text-3xl font-serif font-semibold'>No Data Found</h1>
                  </div>
                </>
              }
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmployeeDashboard