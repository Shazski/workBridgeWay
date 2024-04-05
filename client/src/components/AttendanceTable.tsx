import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { differenceInMinutes, endOfMonth, format, parseISO, startOfMonth } from 'date-fns'
import { IEmployee } from '../interface/IEmployeeData'
import { getEmployeeDetails } from '../redux/actions/employee/employeeActions'
import { TODO } from '../config/constants'

const AttendanceTable = () => {
  const { user } = useSelector((state: RootState) => state.user)
  const [employeeData, setEmployeeData] = useState<IEmployee | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const getEmployeeData = async () => {
      const { payload } = await dispatch(getEmployeeDetails(user._id))
      setEmployeeData({ ...payload })
    }
    getEmployeeData()
  }, [])

  function calculateWorkHoursWithDeduction(checkIn: string, checkOut: string): number {
    try {
      const checkInTime = parseISO(`1970-01-01T${checkIn}`);
      const checkOutTime = parseISO(`1970-01-01T${checkOut}`);

      if (isNaN(checkInTime.getTime()) || isNaN(checkOutTime.getTime())) {
        throw new Error('Invalid time format');
      }

      const timeDiffInMinutes = differenceInMinutes(checkOutTime, checkInTime);

      const adjustedTimeDiff = timeDiffInMinutes - 10;

      const adjustedTimeDiffInHours = adjustedTimeDiff / 60;
      if (adjustedTimeDiffInHours < 1) {
        return 0
      }
      return adjustedTimeDiffInHours;
    } catch (error: TODO) {
      console.error(`Error: ${error.message}`);
      return NaN;
    }
  }

  const filterDataByMonth = (data: IEmployee | null): IEmployee | null => {
    if (!data) return null;

    const startDate = startOfMonth(selectedMonth);
    const endDate = endOfMonth(selectedMonth);

    const filteredAttendance = data.attendance?.filter(
      (att) =>
        att.date &&
        parseISO(att?.date.toString()).getTime() >= startDate.getTime() &&
        att.date &&
        parseISO(att?.date.toString()).getTime() <= endDate.getTime()
    );

    return {
      ...data,
      attendance: filteredAttendance,
    };
  };

  const handleMonthChange = (newMonth: Date) => {
    setSelectedMonth(newMonth);
  };

  return (
    <div className="mt-2 mx-4 flex-grow">
      <div className='mt-20 text-center'>
        <label className="mr-2">Select Month:</label>
        <input
          type="month"
          value={format(selectedMonth, 'yyyy-MM')}
          onChange={(e) => handleMonthChange(parseISO(`${e.target.value}-01`))}
          className='px-3 py-3 rounded-lg border'
        />
      </div>
      <div className="flex flex-col border shadow-xl  h-full mt-16">
        <div className="sm:mx-6 lg:mx-8 flex-grow">
          <div className="inline-block min-w-full py-2  ">

            <div className="overflow-x-auto h-[450px] scrollbar">
              <table className="min-w-full text-left text-sm font-light">
                <thead
                  className="border-b bg-white sticky top-0 w-full poppins font-medium dark:border-neutral-500 dark:bg-neutral-600">
                  <tr>
                    <th scope="col" className="px-6 py-4">Date</th>
                    <th scope="col" className="px-6 py-4">Day</th>
                    <th scope="col" className="px-6 py-4">Check-In</th>
                    <th scope="col" className="px-6 py-4">Check-Out</th>
                    <th scope="col" className="px-6 py-4">Work-Hours</th>
                    <th scope="col" className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    filterDataByMonth(employeeData)?.attendance?.map((att, idx) => (
                      <>
                        <tr key={idx}
                          className="border-b poppins bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                          <td className="flex whitespace-nowrap py-4 px-6 font-semibold"><h1 className="mt-3">{att?.date && format(att?.date, "dd-MM-yyyy")}</h1></td>
                          <td className="whitespace-nowrap px-6 py-4"><h1 className="mt-3 font-semibold">{att?.date && format(att?.date, "EEEE")}</h1></td>
                          <td className="whitespace-nowrap px-6 py-4"><h1 className="text-blue-700 font-semibold">{att?.checkIn}</h1></td>
                          <td className="whitespace-nowrap px-6 py-4"><h1 className="text-red-700 font-semibold">{`${att?.checkOut}`}</h1></td>
                          <td className="whitespace-nowrap px-6 py-4"><h1 className="text-lightgreen font-semibold"> {att?.checkIn && att?.checkOut && calculateWorkHoursWithDeduction(att.checkIn, att.checkOut)} <span>Hrs</span></h1></td>
                          <td className="whitespace-nowrap px-6 py-4"><h1 className={`font-semibold rounded-md border px-2 py-1 w-min ${att?.status === ("Late Arrival" || "Absent") ? 'text-red-700 border-red-600 ' : 'text-green-600 border-green-600'} `}>{att?.status}</h1></td>
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
    </div>
  )
}

export default AttendanceTable