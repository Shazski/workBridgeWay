import FindJobSideBar from "../../components/user/FindJobSideBar"
import FindJobTopSection from "../../components/user/FindJobBannerSection"
import Navbar from "../../components/user/Navbar"
import { useEffect, useRef } from "react"

const FindJobs = () => {
    const scrollRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [scrollRef])
    return (
        <div ref={scrollRef}>
            <div>
                <Navbar />
            </div>
            <div className="bg-blue-50">
            <FindJobTopSection/>
            </div>
            <div className="flex justify-center ">
                <FindJobSideBar/>
            </div>
        </div>
    )
}

export default FindJobs
