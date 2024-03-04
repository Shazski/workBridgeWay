import { FC } from 'react'
import Navbar from '../../components/user/Navbar'
import HomeTopSection from '../../components/user/HomeTopSection'
import COMPANYIMG from "../../assets/images/companyimg.png"
import CTAIMG from "../../assets/images/CTA.png"
import CategorySection from '../../components/user/CategorySection'
import PreferredJobs from '../../components/user/PreferredJobs'
import LatestJobs from '../../components/user/LatestJobs'
const Home: FC = () => {

  return (
    <div className=''>
      <div>
        <Navbar />
      </div>
      <div className='bg-blue-50'>
        <HomeTopSection />
      </div>
      <div className='mt-7 w-full'>
        <img src={COMPANYIMG} className='w-full h-20 md:h-32' alt="" />
      </div>
      <div className='bg-white'>
        <CategorySection />
      </div>
      <div className='mt-12 flex justify-center md:h-80'>
        <img src={CTAIMG} className='filter text-red-600 bg-lightgreen' alt="" />
      </div>
      <div>
        <PreferredJobs />
      </div>
      <div className='bg-blue-50'>
        <LatestJobs />
      </div>
    </div>
  )
}

export default Home
