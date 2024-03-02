import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { useParams } from "react-router-dom"

const ApplicantResume = () => {
  const { editJob } = useSelector((state: RootState) => state.company)
  let resumeUrl
  const { userId } = useParams()
  resumeUrl = editJob?.applicants?.find((value: any) => value.applicantId === userId)

  return (
    <div>
      <iframe src={resumeUrl?.resume} height={"500"} width={"100%"}></iframe>
    </div>
  )
}

export default ApplicantResume