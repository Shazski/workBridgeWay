import FeaturedjobCard from '../user/FeatuedJobCard'
const JobUpdates = () => {
    
    return (
        <div className='border mt-12'>
            <div className='border flex justify-between h-12 items-center'>
                <h1 className='font-serif ps-7 text-xl font-medium'>JobUpdates</h1>
                <h1 className='text-lightgreen me-20'>View All</h1>
            </div>
            {/* <div className='grid ms-12 grid-cols-1 lg:grid-cols-2 xl:grid-cols-4'>
                <FeaturedjobCard showApplied={true}/>
                <FeaturedjobCard showApplied={true}/>
                <FeaturedjobCard showApplied={true}/>
                <FeaturedjobCard showApplied={true}/>
            </div> */}
        </div>
    )
}

export default JobUpdates
