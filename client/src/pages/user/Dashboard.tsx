import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { TODO } from "../../config/constants"

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import { getUserApplications } from "../../redux/actions/user/userActions"
import JoinRoom from "../chat/JoinRoom"
import TOTALJOB from '../../assets/images/Vector (Stroke).png'
import INTERVIEW from '../../assets/images/interviewed.png'

const Dashboard = () => {
    const { user } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [idx, setIdx] = useState<number>(0);
    const [sortedScheduleData, setSortedScheduleData] = useState<TODO>([]);
    const [interviewedJobsCount, setInterviewedJobsCount] = useState<number>(0)


    const { userAppliedJobs, userAppliedJobsCount } = useSelector((state: RootState) => state.job);

    useEffect(() => {
        dispatch(getUserApplications({ page: 1, getStatus: "" }));
    }, [])

    useEffect(() => {
        const count = userAppliedJobs?.filter(job => job?.hiringStage === "interview")?.length;
        setInterviewedJobsCount(count);
    }, [userAppliedJobs]);

    const formatAdjustedTimeToAMPM = (time24HourFormat: string, adjustmentHours: number): string => {
        if (!time24HourFormat) return "";

        const timeIn24HourFormat = new Date(`2000-01-01T${time24HourFormat}:00Z`);
        timeIn24HourFormat.setHours(timeIn24HourFormat.getHours() + adjustmentHours);
        timeIn24HourFormat.setMinutes(0);

        const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' };
        return timeIn24HourFormat.toLocaleTimeString(undefined, options);
    };
    const formatTimeToAMPM = (time24HourFormat: string): string => {
        if (!time24HourFormat) return "";

        const timeIn24HourFormat = new Date(`2000-01-01T${time24HourFormat}:00Z`);
        const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' };
        return timeIn24HourFormat.toLocaleTimeString(undefined, options);
    };
    const calculateDateDifference = (date1: Date, date2: Date): number => {
        const oneDay = 24 * 60 * 60 * 1000;
        const diffDays = Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
        return diffDays;
    };


    let userSchedule
    useEffect(() => {
        const userScheduleList = userAppliedJobs?.filter((job) => job?.schedule && job?.schedule.length > 0 && job.schedule);

        const schedules = userScheduleList?.flatMap((job) => job?.schedule?.filter((schedule) => new Date(schedule.date) > new Date()));

        userSchedule = schedules;

    }, [userAppliedJobs, dispatch])

    const isScheduleDataValid = Array.isArray(userSchedule);



    const todayDate = new Date();
    const scheduleDate = new Date(sortedScheduleData?.[idx]?.date);

    const dateDifference = calculateDateDifference(todayDate, scheduleDate);

    let sortedData
    useEffect(() => {
        if (Array.isArray(userSchedule)) {
            sortedData = [...userSchedule]?.sort((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return dateA - dateB;
            });
            setSortedScheduleData(sortedData);
        }
    }, [userSchedule]);


    const openVideoCallModal = () => {
        setIsModalOpen(true)
    }

    return (
        <>
            <div className="flex justify-between bg-white sticky top-0 items-center h-16 border-b-2">
                <div className="ms-12">
                    <h1 className="text-2xl font-serif font-semibold">DashBoard</h1>
                </div>
                <div className="md:me-36 me-3">
                    <button className="border border-blue-gray-100 px-4 py-2 text-lightgreen font-medium font-serif" onClick={openVideoCallModal}>VideoCall</button>
                </div>
            </div>
            <JoinRoom navigation="/user/videocall/" isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <h1 className="text-2xl font-semibold font-serif text-center mt-12">Hello {user?.userName}</h1>
            <div className="flex items-center gap-x-4 w-full ms-12 mt-12">
                <div className="border-2 px-4 py-2 w-3/6 h-2/6 ">
                    <div className="border-b mt-2">
                        <h1 className="font-serif mb-2 font-semibold">Upcoming Interview</h1>
                    </div>
                    <div className="border-b mt-6 flex justify-between">
                        <h1>{dateDifference === 0 ? 'Today' : `${dateDifference} days left`}, {new Date(sortedScheduleData?.[idx]?.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</h1>
                        <div className="flex text-3xl font-semibold">
                            <MdKeyboardArrowLeft className={`cursor-pointer ${idx === 0 ? 'hidden' : 'block'}`} onClick={() => idx > 0 && setIdx(idx - 1)} />
                            <MdKeyboardArrowRight className={`cursor-pointer ${idx === sortedScheduleData?.length - 1 ? 'hidden' : 'block'}`} onClick={() => idx < (sortedScheduleData?.length - 1) && setIdx(idx + 1)} />
                        </div>
                    </div>
                    <div className="flex w-full mt-7">
                        {isScheduleDataValid && (
                            <div className="flex gap-y-4 w-1/6 flex-col">
                                <h1 className="text-xs">{formatAdjustedTimeToAMPM(sortedScheduleData?.[idx]?.time, -1)}</h1>
                                <h1 className="text-xs">{formatTimeToAMPM(sortedScheduleData?.[idx]?.time)} <span className="ms-2">"-----"</span>  </h1>
                                <h1 className="text-xs">{formatAdjustedTimeToAMPM(sortedScheduleData?.[idx]?.time, 1)}</h1>
                            </div>
                        )}
                        <div className="border 4/6 flex px-4 py-2 h-16 mt-2 ms-4 rounded-lg gap-x-5 bg-light-blue-50">
                            <div className="pe-20 ps-5">
                                {/* <h1 className="font-serif break-all">EmpId:{sortedScheduleData?.[idx]?.employeeId}</h1> */}
                                <h1 className="text-xs">Test Type: <span className="font-semibold"> {sortedScheduleData?.[idx]?.testType}</span> </h1>
                                <h1 className="text-xs">RoomId: <span className="font-semibold"> {sortedScheduleData?.[idx]?.roomId}</span> </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border md:w-1/4 h-52">
                    <div className="">
                        <h1 className="text-2xl font-serif ms-3 mt-3">Total Job Applied</h1>
                        <h1 className="text-6xl mt-3 ms-5 font-serif font-bold">{userAppliedJobsCount}</h1>
                        <img src={TOTALJOB} alt="" className="mt-7 ms-auto" />
                    </div>
                </div>

            </div>
            <div className="border ms-12 mt-6 md:w-1/4 h-52">
                <div className="">
                    <h1 className="text-2xl font-serif ms-3 mt-3">Interview</h1>
                    <h1 className="text-6xl mt-3 ms-5 font-serif font-bold">{interviewedJobsCount}</h1>
                    <img src={INTERVIEW} alt="" className="mt-7 ms-auto" />
                </div>
            </div>
        </>
    )
}

export default Dashboard
