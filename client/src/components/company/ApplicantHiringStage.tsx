
const ApplicantHiringStage = () => {
  return (
    <div className="mt-4">
      <h1 className='font-semibold text-blue-gray-800 ms-3'>Current Stage</h1>
      <div className="flex">
        <div className="ms-4 mt-4 -skew-x-12 px-7 bg-blue-gray-50 text-lightgreen font-semibold py-1">In-Review</div>
        <div className="ms-1 mt-4 -skew-x-12 px-7 bg-blue-gray-50 text-lightgreen font-semibold  py-1">Shortlisted</div>
        <div className="ms-1 mt-4 -skew-x-12 px-7 text-white bg-lightgreen font-semibold  py-1">Interview</div>
        <div className="ms-1 mt-4 -skew-x-12 px-7 bg-blue-gray-50 text-gray-500 py-1">Hired/Declined</div>
      </div>
      <div>
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
      </div>
    </div>
  )
}

export default ApplicantHiringStage