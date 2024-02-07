import DataBox from "./DataBox";

const CompanyDashboardGreeting = () => {
    const time: Date = new Date()
    const greeting: number = time.getHours()

    return (
        <div>
            <div className="xl:flex ms-12 lg:ms-0 justify-around mt-10">
                <div>
                    <h1 className="font-serif text-xl font-bold">Good{greeting > 12 ? "Afternoon" : "Morning"}, Sharoon</h1>
                </div>
            </div>
            <div className="2xl:flex ms-12 lg:ms-0 justify-around">
                <DataBox color="bg-lightgreen" data="76" message="New Candidates to review" />
                <DataBox color="bg-teal-400" data="3" message="Schedule for today" />
                <DataBox color="bg-blue-400" data="24" message="Messages received" />
            </div>
        </div>
    )
}

export default CompanyDashboardGreeting
