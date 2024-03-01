
import { NavLink, Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const ApplicantDetailsSection = () => {
  const { id, userId } = useParams()
  return (
    <div className='border mt-1'>
      <div className="flex border-b-2 gap-x-12">
        <NavLink to={`/company/applicants/${id}/${userId}/profile`} className={({isActive}) => {
          return `text-sm px-2 py-2 font-semibold text-blue-gray-700 ms-2 ${isActive ? 'border-b-4 border-lightgreen text-blue-gray-900':''} `
        }}>Profile</NavLink>
        <NavLink to={`/company/applicants/${id}/${userId}/resume`} className={({isActive}) => {
          return `text-sm px-2 py-2 font-semibold text-blue-gray-700 ms-2 ${isActive ? 'border-b-4 border-lightgreen text-blue-gray-900':''} `
        }}>Resume</NavLink>
        <NavLink to={`/company/applicants/${id}/${userId}/hiring-stage`} className={({isActive}) => {
          return `text-sm px-2 py-2 font-semibold text-blue-gray-700 ms-2 ${isActive ? 'border-b-4 border-lightgreen text-blue-gray-900':''} `
        }}>Hiring Progress</NavLink>
        <NavLink to={`/company/applicants/${id}/${userId}/interview-schedule`} className={({isActive}) => {
          return `text-sm px-2 py-2 font-semibold text-blue-gray-700 ms-2 ${isActive ? 'border-b-4 border-lightgreen text-blue-gray-900':''} `
        }}>Interview Schedule</NavLink>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default ApplicantDetailsSection