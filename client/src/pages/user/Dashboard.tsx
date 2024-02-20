import { useEffect } from "react"
import ProfileHeader from "../../components/user/ProfileHeader"
import { useRef } from "react"

const Dashboard = () => {
    const scrollRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [scrollRef])
    return (
        <>
            <div ref={scrollRef}>
                <ProfileHeader page="Dashboard" />
            </div>
        </>
    )
}

export default Dashboard
