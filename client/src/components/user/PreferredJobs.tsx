import { useEffect } from "react"
import FeatuedJobCard from "./FeatuedJobCard"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"
import { getUserpreferredJob } from "../../redux/actions/user/userActions"

const PreferredJobs = () => {
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
         dispatch(getUserpreferredJob())
    },[])
    return (
        <div className="ms-14 md:ms-36">
            <div className="mt-8 md:mt-20">
                <h1 className="text-3xl font-serif">Preferred<span className="text-blue-500"> Jobs </span></h1>
            </div>
            <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 ">
                <FeatuedJobCard />
                <FeatuedJobCard />
                <FeatuedJobCard />
                <FeatuedJobCard />
                <FeatuedJobCard />
                <FeatuedJobCard />
                <FeatuedJobCard />
                <FeatuedJobCard />
            </div>
        </div>
    )
}

export default PreferredJobs
