import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { format } from "date-fns"
import { useParams } from "react-router-dom"

const ApplicantPersonalInfo = () => {
  const { applicantData, editJob } = useSelector((state: RootState) => state.company)
  const { userId } = useParams()
  const ApplicantData: any = editJob?.applicants?.find((value: any) => value.applicantId === userId)
  return (
    <div className='mt-4'>
      <h1 className='font-semibold text-blue-gray-800 ms-3'>Personal Info</h1>
      <div className='ms-3 grid grid-cols-2 border-b-2'>
        <div>
          <h1 className="text-sm text-gray-600 mt-4 poppins">Full Name</h1>
          <h1 className="text-sm text-gray-900 ">{applicantData?.userName}</h1>
        </div>
        <div>
          <h1 className="text-sm text-gray-600 mt-4 poppins">Date of birth</h1>
          <h1 className="text-sm text-gray-900 mt-1">{applicantData?.dob ? format(String(applicantData?.dob), "dd-MM-yyy") : "Not Provided"}</h1>
        </div>
        <div>
          <h1 className="text-sm text-gray-600 mt-4 poppins">Linked In</h1>
          <a href={`https://${ApplicantData?.linkedIn}`} target="_blank" className="text-sm text-lightgreen ">{ApplicantData?.linkedIn || "Not provided"}</a>
        </div>
      </div>
      <h1 className='font-semibold text-blue-gray-800 ms-3 mt-4'>Proffesional Info</h1>
      <div className='ms-3 '>
        <div>
          <h1 className="text-sm text-gray-600 mt-4 poppins">About Me</h1>
          <h1 className="text-xs w-96 text-black mt-2">{applicantData?.about || "Not Provided"}</h1>
        </div>
      </div>
      <div className='ms-3 grid grid-cols-2'>
        <div>
          <h1 className="text-sm text-gray-600 mt-4 poppins">Current Job</h1>
          <h1 className="text-sm text-black mt-1 font-medium">{ApplicantData?.previousJob || "Not Provided"}</h1>
        </div>
        <div className="mb-5">
          <h1 className="text-sm text-gray-600 mt-4 poppins">Skill set</h1>
          <div className="flex flex-wrap gap-x-2">
            {applicantData?.skills ?
              applicantData.skills.map((skill, idx) => (
                <div key={idx}>
                  <h1 className="text-sm text-lightgreen mt-1 font-medium px-2 py-1 rounded-md bg-gray-200">{skill}</h1>
                </div>
              ))
              : <>
                <h1>Not Provided</h1>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicantPersonalInfo