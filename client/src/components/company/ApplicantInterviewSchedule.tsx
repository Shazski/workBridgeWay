import { FormEvent, useEffect, useState } from 'react';
import LOGO from '../../assets/images/Logo.png'
import Modal from '../Modal';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import moment from 'moment-timezone';
import { cancelInterviewForUser, getAllCompanyEmployees, scheduleInterviewForUser } from '../../redux/actions/company/CompanyActions';
import toast from 'react-hot-toast';
import { GiCancel } from "react-icons/gi";
const ApplicantInterviewSchedule = () => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [testType, setTestType] = useState<string>("");
  const { editJob } = useSelector((state: RootState) => state.company)
  const [employeeId, setEmployeeId] = useState<string>("");
  const [refetch, setRefetch] = useState<boolean>(false);
  const [scheduleId, setScheduleId] = useState<string>("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false)
  const [scheduleDateAndTime, setScheduleDateAndTime] = useState<string>("");

  const { id, userId } = useParams()
  const dispatch = useDispatch<AppDispatch>()

  const ApplicantData: any = editJob?.applicants?.find((value: any) => value.applicantId === userId)
  const { employees } = useSelector((state: RootState) => state.company)
  const formatDate = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return formattedDate;
  };

  const convertToLocalTime = (time: string) => {
    const localTime = moment(time, 'HH.mm').format('h:mm A');
    return localTime;
  };

  const handleInterviewSchedule = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const interviewData = {
      userId: userId!,
      jobId: id!,
      scheduleData: {
        testType: testType,
        date: scheduleDateAndTime.split('T')[0],
        time: scheduleDateAndTime.split('T')[1],
        employeeId: employeeId
      }
    }

    dispatch(scheduleInterviewForUser(interviewData))
    setTestType("")
    setIsModalOpen(false)
    toast.success("Interview Scheduled Successfully")
  }

  useEffect(() => {
    dispatch(getAllCompanyEmployees({ page: 1, search: "" }))
  }, [])

  const handleRemove = async () => {
    const interviewData = {
      userId: userId!,
      jobId: id!,
      scheduleId: scheduleId
    }
    dispatch(cancelInterviewForUser(interviewData))
    setRefetch(!refetch)
    setIsConfirmModalOpen(false)
    toast.success("Interview Canceled successfully")
  }

  return (
    <div className='h-[500px] scrollbar overflow-y-scroll '>
      <div className="grid grid-cols-2 pt-4 ps-12  sticky -top-0 z-50 w-full bg-white h-12">
        <div className=''>
          <h1 className="text-gray-800 ms-3 text-sm  font-semibold">Interview List</h1>
        </div>
        <div>
          <h1 onClick={() => setIsModalOpen(true)} className="font-semibold hover:cursor-pointer text-sm text-lightgreen">+ Add Schedule Interview</h1>
        </div>
      </div>
      {
        ApplicantData?.schedule?.map((schedule: { testType: string, date: string, time: string, employeeId: string, _id: string }, idx: number) => (
          <>
            <div key={idx} className="border mt-5 flex justify-between flex-wrap ">
              <div className='ms-3 mt-4 flex gap-x-3'>
                <img src={LOGO} alt="" className='w-12 h-12 rounded-full border' />
                <div className='mt-2'>
                <h1 className='text-sm text-blue-gray-800 font-semibold'>
  {`${employees?.find((emp) => emp._id === schedule.employeeId)?.name || "Not Available"}`}
</h1>
                  <h1 className='text-xs text-gray-600'>{schedule?.testType}</h1>
                </div>
              </div>
              <div className='mt-5'>
                <div className='flex gap-x-3'>
                  <h1 className='text-sm font-semibold text-gray-800'>{formatDate(schedule?.date)}</h1>
                  <h1 className='text-sm font-semibold text-gray-800'>{convertToLocalTime(schedule?.time)}</h1>
                </div>
                <h1 className='text-xs'>RoomId .<span>{typeof editJob?.companyId === 'object' ? editJob?.companyId?.name : editJob?.companyId}</span> </h1>
              </div>
              <div>
                <GiCancel onClick={() => { setIsConfirmModalOpen(true), setScheduleId(schedule?._id) }} className='text-xl text-red-600 mt-5 me-12 cursor-pointer rounded-md ' />
              </div>
            </div>
          </>
        ))
      }
      <Modal isVisible={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div>
          <form action="" onSubmit={handleInterviewSchedule}>
            <div>
              <label htmlFor="" className='text-gray-600 text-sm font-semibold'>Test Type</label>
              <input required name="testType" className="border rounded-md py-2 px-2 mt-2 w-full outline-none" placeholder='Enter Test Type' value={testType} onChange={(e) => setTestType(e.target.value)} />
            </div>
            <div className='mt-4'>
              <label htmlFor="" className='text-gray-600 text-sm font-semibold'>Select Employee</label>
              <select onChange={(e) => setEmployeeId(e.target.value)} required name="employeeId" className="border rounded-md py-2 px-2 w-full outline-none" >
                <option value="" defaultChecked hidden className='text-gray-600 '>Select Employee</option>
                {employees?.map((emp, idx) => (
                  <>
                    <option key={idx} value={emp._id} className='text-gray-600 '>{emp?.name}</option>
                  </>
                ))}
              </select>
            </div>
            <div className='mt-4'>
              <label htmlFor="" className='text-gray-600 text-sm font-semibold'>Select Date and Time</label>
              <input onChange={(e) => setScheduleDateAndTime(e.target.value)} required type="datetime-local" className='border rounded-md py-2 px-2 w-full outline-none' />
            </div>
            <div className='mt-4 flex justify-center'>
              <button className='bg-lightgreen text-white font-semibold text-center px-3 py-2 rounded-md'>Schedule</button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal isVisible={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)}>
        <h1 className="uppercase font-semibold text-center">Do you want to cancel the interview</h1>
        <div className="flex gap-x-2 justify-center mt-5">
          <button onClick={handleRemove} className="bg-black  text-white font-semibold px-3 py-2 rounded-md">Yes</button>
          <button onClick={() => setIsConfirmModalOpen(false)} className="bg-blue-600 text-white  font-semibold px-4  py-2 rounded-md">No</button>
        </div>
      </Modal>
    </div>
  )
}

export default ApplicantInterviewSchedule