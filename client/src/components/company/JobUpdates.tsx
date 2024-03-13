import { useDispatch, useSelector } from 'react-redux'
import FeatuedJobCard from '../user/FeatuedJobCard'
import { AppDispatch, RootState } from '../../redux/store'
import { useEffect } from 'react'
import { getJobs } from '../../redux/actions/company/CompanyActions'
const JobUpdates = () => {
    useEffect(() => {
        dispatch(getJobs({ page: 1, search: "" }))
    }, [])
    const { jobs } = useSelector((state: RootState) => state.company)
    console.log("🚀 ~ JobUpdates ~ jobs:", jobs)
    const dispatch = useDispatch<AppDispatch>()
    return (
        <div className='border mt-12'>
            <div className='border flex justify-between h-12 items-center'>
                <h1 className='font-serif ps-7 text-xl font-medium'>JobUpdates</h1>
                <h1 className='text-lightgreen me-20'>View All</h1>
            </div>
            {
                jobs && jobs?.length > 0 ?
                    <>
                        <div className="grid xl:grid-cols-4 sm:grid-cols-2 ms-12 grid-cols-1">
                            {
                                jobs?.slice(0,4).map((job, idx) => (
                                    <div key={idx}>
                                        <FeatuedJobCard job={job} showCompanyLogo={false}/>
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

export default JobUpdates
