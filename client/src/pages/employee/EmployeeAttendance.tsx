import AttendanceTable from '../../components/AttendanceTable'

const EmployeeAttendance = () => {
  return (
    <div>
      <div className="filter  md:flex justify-evenly  mt-6">
        <div className='w-full ms-20'>
          <h1 className='text-2xl font-semibold font-serif'>Attendance History</h1>
        </div>
      </div>
      <AttendanceTable />
    </div>
  )
}

export default EmployeeAttendance