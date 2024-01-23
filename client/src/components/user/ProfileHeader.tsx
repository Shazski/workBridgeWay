import { Link } from "react-router-dom"

const ProfileHeader = ({ page = "Dashboard" }: { page?: string }) => {
    return (
        <div className="flex justify-between items-center h-16 border-b-2">
            <div className="ms-12">
                <h1 className="text-2xl font-serif font-semibold">{page}</h1>
            </div>
            <div className="md:me-36 me-3">
                <Link className="border border-blue-gray-100 px-4 py-2 text-lightgreen font-medium font-serif" to={'/'}>Back to homepage</Link>
            </div>
        </div>
    )
}

export default ProfileHeader
