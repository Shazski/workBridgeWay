
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';
import { getAllCompanyEmployees, scheduleInterviewForUser, updateApplicantStatus } from '../../redux/actions/company/CompanyActions';
import { changeStatus } from '../../redux/reducers/company/companySlice';
import Modal from '../Modal';
import { FormEvent, useEffect, useState } from 'react';
const ApplicantDetailsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [testType, setTestType] = useState<string>("");
  const [stage, setStage] = useState<string>("");
  const [employeeId, setEmployeeId] = useState<string>("");
  const [scheduleDateAndTime, setScheduleDateAndTime] = useState<string>("");
  const { id, userId } = useParams()
  const { editJob } = useSelector((state: RootState) => state.company)
  const ApplicantData: any = editJob?.applicants?.find((value: any) => value.applicantId === userId)

  const dispatch = useDispatch<AppDispatch>()
  const { employees } = useSelector((state: RootState) => state.company)

  const handleUpdateStatus = (userId: string, jobId: string, status: string) => {
    const updateData = {
      applicantId: userId,
      jobId: jobId,
      status: status
    };

    if (status === "interview") {
      setStage(status)
      setIsModalOpen(true)
    } else {
      dispatch(changeStatus(updateData))
      dispatch(updateApplicantStatus(updateData));
    }
  };

  const statusColor = {
    inreview: 'orange',
    shortlisted: 'cyan',
    interview: 'yellow',
    rejected: 'red',
    accepted: 'green'
  };

  const handleInterviewSchedule = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const updateData = {
      applicantId: userId!,
      jobId: id!,
      status: stage
    };
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
    dispatch(changeStatus(updateData))
    dispatch(updateApplicantStatus(updateData));
    setIsModalOpen(false)
  }

  useEffect(() => {
    dispatch(getAllCompanyEmployees({ page: 1, search: "" }))
  }, [])
  const currentDate = new Date().toISOString().slice(0, 16);

  return (
    <div className='border rounded-md mt-1'>
      <div className="flex border-b-2 gap-x-12">
        <NavLink to={`/company/applicants/${id}/${userId}/profile`} className={({ isActive }) => {
          return `text-sm px-2 py-2 font-semibold text-blue-gray-700 ms-2 ${isActive ? 'border-b-4 border-lightgreen text-blue-gray-900' : ''} `
        }}>Profile</NavLink>
        <NavLink to={`/company/applicants/${id}/${userId}/resume`} className={({ isActive }) => {
          return `text-sm px-2 py-2 font-semibold text-blue-gray-700 ms-2 ${isActive ? 'border-b-4 border-lightgreen text-blue-gray-900' : ''} `
        }}>Resume</NavLink>
        <NavLink to={`/company/applicants/${id}/${userId}/hiring-stage`} className={({ isActive }) => {
          return `text-sm px-2 py-2 font-semibold text-blue-gray-700 ms-2 ${isActive ? 'border-b-4 border-lightgreen text-blue-gray-900' : ''} `
        }}>Hiring Progress</NavLink>
        <NavLink to={`/company/applicants/${id}/${userId}/interview-schedule`} className={({ isActive }) => {
          return `text-sm px-2 py-2 font-semibold text-blue-gray-700 ms-2 ${isActive ? 'border-b-4 border-lightgreen text-blue-gray-900' : ''} `
        }}>Interview Schedule</NavLink>
        <select onChange={(e) => handleUpdateStatus(userId!, editJob?._id!, e.target.value)} className={`outline-none border px-2 border-${statusColor[ApplicantData?.hiringStage]}-600 text-${statusColor[ApplicantData?.hiringStage]}-600 h-8 mt-1 rounded-md  font-semibold`} name="hiringStage" id="">
          <option defaultChecked hidden value="">{ApplicantData?.hiringStage}</option>
          <option className='font-semibold pt-2 text-gray-600' value="shortlisted" style={{ display: ApplicantData?.hiringStage === 'shortlisted' ? 'none' : 'block' }}>Shortlisted</option>
          <option className='font-semibold pt-2 text-gray-600' value="interview" style={{ display: ApplicantData?.hiringStage === 'interview' ? 'none' : 'block' }}>Interview</option>
          <option className='font-semibold pt-2 text-gray-600' value="accepted" style={{ display: ApplicantData?.hiringStage === 'accepted' ? 'none' : 'block' }}>Accept</option>
          <option className='font-semibold pt-2 text-gray-600' value="rejected" style={{ display: ApplicantData?.hiringStage === 'rejected' ? 'none' : 'block' }}>Reject</option>
        </select>
      </div>
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
              <input min={currentDate} onChange={(e) => setScheduleDateAndTime(e.target.value)} required type="datetime-local" className='border rounded-md py-2 px-2 w-full outline-none' />
            </div>
            <div className='mt-4 flex justify-center'>
              <button className='bg-lightgreen text-white font-semibold text-center px-3 py-2 rounded-md'>Schedule</button>
            </div>
          </form>
        </div>
      </Modal>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default ApplicantDetailsSection