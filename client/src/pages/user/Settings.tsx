import ProfileHeader from "../../components/user/ProfileHeader"
import SettingsNavbar from "../../components/user/SettingsNavbar"

const Settings = () => {
    return (
        <div>
            <ProfileHeader page='Settings' />
            <div>
                <SettingsNavbar />
            </div>
        </div>
    )
}

export default Settings
