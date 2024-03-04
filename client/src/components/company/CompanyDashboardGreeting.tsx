import { useDispatch, useSelector } from "react-redux";
import DataBox from "./DataBox";
import { RootState } from "../../redux/store";
import { AppDispatch } from "../../redux/store"
import { useEffect, useState } from "react";
import { getJobs } from "../../redux/actions/company/CompanyActions";
const CompanyDashboardGreeting = () => {
    const time: Date = new Date()
    const [page, _] = useState<number>(1);
    const greeting: number = time.getHours()
    const dispatch = useDispatch<AppDispatch>()
    const { user } = useSelector((state: RootState) => state.user)
    const { pendingApplicantsCount } = useSelector((state: RootState) => state.company)

    useEffect(() => {
        dispatch(getJobs({ page }))
    },[])

    return (
        <div>
            <div className="xl:flex flex flex-col items-center ms-12 lg:ms-0 justify-center mt-10">
                <div>
                    <h1 className="font-serif text-xl font-bold">Good{greeting > 12 ? "Afternoon" : "Morning"}, {user?.name}</h1>
                </div>
            </div>
            <div className="flex flex-col 2xl:flex-row justify-center items-center">
                <DataBox color="bg-lightgreen" data={pendingApplicantsCount} message="New Candidates to review" />
                <DataBox color="bg-teal-400" data="3" message="Schedule for today" />
                <DataBox color="bg-blue-400" data="24" message="Messages received" />
            </div>
        </div>
    )
}

export default CompanyDashboardGreeting
