import { CiCircleCheck } from "react-icons/ci";
import { format, parseISO } from "date-fns"
const JobDescriptionSection = ({ job }) => {
  return (
    <div>
      <div className="flex ms-4 md:ms-0 justify-center mt-16">
        <div className=" w-4/12">
          <h2 className="text-2xl font-serif">Description</h2>
          <h2 className="text-xs text-gray-500 mt-3">{job.jobDescription}</h2>
          <h2 className="text-2xl font-serif mt-8">Responsibilities</h2>
          {
            job?.responsibilities?.map((resposibility, idx) => (
              <>
                <div key={idx} className="flex gap-3 mt-2">
                  <CiCircleCheck className="text-2xl md:text-2xl text-lightgreen" />
                  <h2 className="text-sm">{resposibility}</h2>
                </div >
              </>
            ))
          }
        </div>
        <div className="ms-12 md:ms-52">
          <div>
            <h1 className="font-serif  text-xl">About this role</h1>
            <h1 className="mt-5"><span className="font-medium">{job?.applicants?.length || 0} applied</span> of {job?.vacancy} capacity</h1>
            <div className="flex justify-between mt-5">
              <h1 className="text-gray-500">Apply Before</h1>
              <h1 className="font-medium">{job?.expiry && format(parseISO(job?.expiry), 'dd-MM-yyyy')}</h1>
            </div>
            <div className="flex justify-between mt-5">
              <h1 className="text-gray-500">Job Posted On</h1>
              <h1 className="font-medium">{job?.createdAt && format(parseISO(job?.createdAt), 'dd-MM-yyyy')}</h1>
            </div>
            <div className="flex justify-between mt-5">
              <h1 className="text-gray-500">Job Type</h1>
              <h1 className="font-medium">{job?.typeOfEmployment}</h1>
            </div>
            <div className="flex justify-between mt-5">
              <h1 className="text-gray-500">Salary</h1>
              <h1 className="font-medium">{job.fromSalary} Rs - {job.toSalary} Rs</h1>
            </div>
          </div>
          <div className="mt-6">
            <h1 className="font-serif font-medium text-xl">Required Skills</h1>
            <div className="flex flex-wrap gap-x-2 mt-4">
              {
                job?.requiredSkills?.map((skill, idx) => (
                  <div key={idx}>
                    <h1 className="text-lightgreen rounded-md border border-lightgreen px-2 mb-3">{skill.toLowerCase()}</h1>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
export default JobDescriptionSection
