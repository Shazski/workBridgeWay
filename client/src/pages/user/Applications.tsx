import ApplicantsTable from '../../components/user/ApplicantsTable'
import ProfileHeader from '../../components/user/ProfileHeader'

const Applications = () => {
  return (
    <div>
      <div>
      <ProfileHeader page='My Applications'/>
      </div>
      <div>
        <ApplicantsTable/>
      </div>
    </div>
  )
}

export default Applications
