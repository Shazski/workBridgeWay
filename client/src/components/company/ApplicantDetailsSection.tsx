
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';
import { updateApplicantStatus } from '../../redux/actions/company/CompanyActions';
import { changeStatus } from '../../redux/reducers/company/companySlice';
const ApplicantDetailsSection = () => {
  const { id, userId } = useParams()
  const { editJob } = useSelector((state: RootState) => state.company)
  const ApplicantData: any = editJob?.applicants?.find((value: any) => value.applicantId === userId)
  const dispatch = useDispatch<AppDispatch>()
  const handleUpdateStatus = (userId: string, jobId: string, status: string) => {
    const updateData = {
      applicantId: userId,
      jobId: jobId,
      status: status
    };
    dispatch(changeStatus(updateData))
    dispatch(updateApplicantStatus(updateData));

  };

  const statusColor = {
    inreview: 'orange',
    shortlisted: 'cyan',
    interview: 'yellow',
    rejected: 'red',
    accepted: 'green'
  };

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
        <select onChange={(e) => handleUpdateStatus(userId!, editJob?._id!, e.target.value)} className={`outline-none border px-2 border-${statusColor[ApplicantData?.hiringStage]}-600 text-${statusColor[ApplicantData?.hiringStage]}-600 h-8 mt-1 text-gray-700 font-semibold`} name="hiringStage" id="">
          <option defaultChecked hidden value="">{ApplicantData?.hiringStage}</option>
          <option className='font-semibold pt-2 text-gray-600' value="shortlisted" style={{ display: ApplicantData?.hiringStage === 'shortlisted' ? 'none' : 'block' }}>Shortlisted</option>
          <option className='font-semibold pt-2 text-gray-600' value="interview" style={{ display: ApplicantData?.hiringStage === 'interview' ? 'none' : 'block' }}>Interview</option>
          <option className='font-semibold pt-2 text-gray-600' value="accepted" style={{ display: ApplicantData?.hiringStage === 'accepted' ? 'none' : 'block' }}>Accept</option>
          <option className='font-semibold pt-2 text-gray-600' value="rejected" style={{ display: ApplicantData?.hiringStage === 'rejected' ? 'none' : 'block' }}>Reject</option>
        </select>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default ApplicantDetailsSection