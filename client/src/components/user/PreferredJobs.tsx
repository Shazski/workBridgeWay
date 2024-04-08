import { useEffect } from "react"
import FeatuedJobCard from "./FeatuedJobCard"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { getUserpreferredJob } from "../../redux/actions/user/userActions"

const PreferredJobs = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { userPreferredJobs } = useSelector((state: RootState) => state.job)
    const { user } = useSelector((state: RootState) => state.user)
    useEffect(() => {
        user &&
            dispatch(getUserpreferredJob())
    }, [])

    return (
        <div className="ms-14 md:ms-36">
            <div className="mt-8 md:mt-20">
                <h1 className="text-3xl font-serif">Preferred<span className="text-blue-500"> Jobs </span></h1>
            </div>
            {
                userPreferredJobs && userPreferredJobs?.length > 0 ?
                    <>
                        <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1">
                            {
                                userPreferredJobs?.map((job, idx) => (
                                    <div key={idx}>
                                        <FeatuedJobCard job={job} />
                                    </div>
                                ))
                            }
                        </div>
                    </>
                    :
                    <>
                        <h1 className="text-xl text-red-500 mt-3">No Prefered Jobs For You ! <br /> Change Your Preferrence</h1>
                    </>
            }

        </div>
    )
}

export default PreferredJobs
