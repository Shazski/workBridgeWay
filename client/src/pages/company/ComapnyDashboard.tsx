import CompanyDashboardGreeting from "../../components/company/CompanyDashboardGreeting"
import JobUpdates from "../../components/company/JobUpdates"

const ComapnyDashboard = () => {
    return (
        <div>
            <div>
                <CompanyDashboardGreeting />
            </div>
            <div>
                <JobUpdates />
            </div>
        </div>

    )
}

export default ComapnyDashboard
