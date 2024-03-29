import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { useParams } from "react-router-dom"
import { TODO } from "../../config/constants"

const ApplicantHiringStage = () => {
  const { editJob } = useSelector((state: RootState) => state.company)
  const { userId } = useParams()
  const linkedInUrl: TODO = editJob?.applicants?.find((value: TODO) => value.applicantId === userId)
  return (
    <div className="mt-4">
      <h1 className='font-semibold text-blue-gray-800 ms-3'>Current Stage</h1>
      <div className="flex">
        <div className={`ms-4 mt-4 -skew-x-12 px-7 ${linkedInUrl?.hiringStage === ("inreview") ? 'text-white bg-lightgreen' : `${linkedInUrl?.hiringStage === "shortlisted" || "interview" ? ' text-lightgreen' : 'text-gray-600'}`} bg-blue-gray-50  font-semibold py-1`}>In-Review</div>
        <div className={`ms-4 mt-4 -skew-x-12 px-7 ${linkedInUrl?.hiringStage === ("shortlisted") ? 'text-white bg-lightgreen' : `${linkedInUrl?.hiringStage !== "inreview" ? 'text-lightgreen ' : 'text-gray-600'}`} bg-blue-gray-50  font-semibold py-1`}>Shortlisted</div>
        <div className={`ms-4 mt-4 -skew-x-12 px-7 ${linkedInUrl?.hiringStage === ("interview") ? 'text-white bg-lightgreen' : `${linkedInUrl?.hiringStage !== "inreview" || "shortlisted" ? `${linkedInUrl?.hiringStage === "accepted" || "rejected" ? `${linkedInUrl?.hiringStage === "inreview" || "shortlisted" ? 'text-gray-600' : 'text-lightgreen'}` : ``}` : 'text-lightgreen'}`} bg-blue-gray-50 ${linkedInUrl?.hiringStage === "accepted" ? 'text-lightgreen' : 'text-gray-600'}  ${linkedInUrl?.hiringStage === "rejected" ? 'text-lightgreen' : 'text-gray-600'} font-semibold py-1`}>Interview</div>
        <div className={`ms-4 mt-4 -skew-x-12 px-7 ${linkedInUrl?.hiringStage === ("accepted") ? 'text-white bg-green-600' : `${linkedInUrl?.hiringStage === "rejected" ? 'bg-red-600 text-white' : `${linkedInUrl?.hiringStage !== ("shortlisted") || ("inreview") || ("interview") ? 'text-gray-600' : ' text-lightgreen'}`}`} bg-blue-gray-50 font-semibold py-1`}>Hired/Declined</div>
      </div>
      <div>
        {
          linkedInUrl?.hiringStage === "interview" ? <>
            <div className="grid grid-cols-2">
              <div>
                <h1 className="text-gray-800 ms-3 text-sm mt-4 font-semibold">Stage Info</h1>
                <h1 className="text-xs ms-3 mt-2 text-gray-600">Interview Date</h1>
                <h1 className="text-xs ms-3 mt-1 text-gray-900">10 - 13 july, 2021</h1>
              </div>
              <div>
                <h1 className="text-gray-700 text-xs mt-11">Interview Status</h1>
                <h1 className="rounded-lg bg-blue-50 px-4 w-24 mt-1 mb-4 text-blue-900">assigned</h1>
              </div>
            </div>
          </> : linkedInUrl?.hiringStage === "shortlisted" ? <>
            <div>
              <h1 className="text-gray-800 ms-3 text-sm mt-4 font-semibold">Stage Info</h1>
              <h1 className="text-xs ms-3 mt-2 text-gray-600">ShortListed</h1>
              <h1 className="text-xs ms-3 mt-1 text-gray-900">The Applicant has been shortlisted</h1>
            </div>
          </> : linkedInUrl?.hiringStage === "inreview" ? <>
            <div>
              <h1 className="text-gray-800 ms-3 text-sm mt-4 font-semibold">Stage Info</h1>
              <h1 className="text-xs ms-3 mt-2 text-gray-600">Inreview</h1>
              <h1 className="text-xs ms-3 mt-1 text-gray-900">The Applicant is in Inreview stage</h1>
            </div>
          </>
            : linkedInUrl?.hiringStage === "accepted" ? <>
              <div className="grid grid-cols-2">
                <div>
                  <h1 className="text-gray-800 ms-3 text-sm mt-4 font-semibold">Stage Info</h1>
                  <h1 className="text-xs ms-3 mt-2 text-gray-600">Hired</h1>
                  <h1 className="text-xs ms-3 mt-1 text-gray-900">The Applicant has been hired</h1>
                </div>
                <div>
                  <h1 className="text-gray-700 text-xs mt-11">offer letter Status</h1>
                  <h1 className="rounded-lg bg-blue-50 px-4 w-24 mt-1 mb-4 text-blue-900">assigned</h1>
                </div>
              </div>
            </> : linkedInUrl?.hiringStage === "rejected" ? <>
              <div className="grid grid-cols-2">
                <div>
                  <h1 className="text-gray-800 ms-3 text-sm mt-4 font-semibold">Stage Info</h1>
                  <h1 className="text-xs ms-3 mt-2 text-gray-600">Rejected</h1>
                  <h1 className="text-xs ms-3 mt-1 text-gray-900">The Applicant has been Rejected</h1>
                </div>
                <div>
                  <h1 className="text-gray-700 text-xs mt-11">Rejected Mail Status</h1>
                  <h1 className="rounded-lg bg-blue-50 px-4 w-20 mt-1 mb-4 text-blue-900">Send</h1>
                </div>
              </div>
            </> : <>
            </>
        }
      </div>
    </div>
  )
}

export default ApplicantHiringStage