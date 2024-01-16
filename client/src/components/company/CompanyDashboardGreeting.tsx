import DataBox from "./DataBox";

const CompanyDashboardGreeting = () => {
    const time: Date = new Date()
    const greeting: number = time.getHours()

    const getCurrentDate = () => {
        const today = new Date();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        const year = today.getFullYear();
        return `${year}-${month}-${day}`;
    }
    return (
        <div>
            <div className="flex justify-around mt-10">
                <div>
                    <h1 className="font-serif text-xl font-bold">Good{greeting > 12 ? "Afternoon" : "Morning"}, Sharoon</h1>
                    <h1 className="text-gray-500">Here is your job listing statics report from july 19 - july 25</h1>
                </div>
                <div className="flex gap-3">
                    <div>
                        <h1 className="text-center font-semibold">From</h1>
                        <input type="date" min={getCurrentDate()} name="filterDate" id="" className="py-3 px-2 border outline-none" />
                    </div>
                    <div>
                        <h1 className="text-center font-semibold">To</h1>
                        <input type="date" min={getCurrentDate()} name="filterDate" id="" className="py-3 px-2 border outline-none" />
                    </div>
                </div>
            </div>
            <div className="xl:flex justify-around">
                <DataBox color="bg-green-500" data="76" message="New Candidates to review" />
                <DataBox color="bg-teal-400" data="3" message="Schedule for today" />
                <DataBox color="bg-blue-400" data="24" message="Messages received" />
            </div>
        </div>
    )
}

export default CompanyDashboardGreeting
