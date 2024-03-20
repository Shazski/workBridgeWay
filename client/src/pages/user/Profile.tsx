import ProfileAbout from "../../components/user/ProfileAbout"
import ProfileHeader from "../../components/user/ProfileHeader"
import ProfileTopSection from "../../components/user/ProfileTopSection"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
const Profile = () => {
  const { user } = useSelector((state: RootState) => state.user)
  return (
    <div>
      <div>
        <ProfileHeader page="My Profile" />
      </div>
      <div>
        <ProfileTopSection user={user} />
      </div>
      <div>
        <ProfileAbout user={user}/>
      </div>

    </div>
  )
}

export default Profile
