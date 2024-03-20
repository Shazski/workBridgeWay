import { useDispatch } from "react-redux"
import ApplicantDetailsSection from "../../components/company/ApplicantDetailsSection"
import ApplicantDetailsSideBar from "../../components/company/ApplicantDetailsSideBar"
import { AppDispatch } from "../../redux/store"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { getApplicantsDetails, getJobById } from "../../redux/actions/company/CompanyActions"

const ApplicantDetails = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { userId, id } = useParams()
  useEffect(() => {
    dispatch(getApplicantsDetails({ userId: userId! }))
    dispatch(getJobById(id!))
  }, [])
  return (
    <div className="w-full flex">
      <div className="md:w-5/12 lg-w-4/6 xl:w-3/12 w-5/12 ms-5">
        <ApplicantDetailsSideBar />
      </div>
      <div className="ms-5 mt-14 md:w-7/12 lg-w-6/6 xl:w-7/12 w-5/12">
        <ApplicantDetailsSection />
      </div>
    </div>
  )
}

export default ApplicantDetails