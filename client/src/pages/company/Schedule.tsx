import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useEffect } from 'react';
import { getAllApplicantSchedule } from '../../redux/actions/company/CompanyActions';
const Schedule = () => {

  const dispatch = useDispatch<AppDispatch>()
  const { companyScheduleData } = useSelector((state: RootState) => state.job)
  useEffect(() => {
    dispatch(getAllApplicantSchedule())
  }, [])

  const events = companyScheduleData?.map((schedule) => ({
    title: schedule?.schedule?.testType,
    start: `${schedule?.schedule?.date}T${schedule?.schedule?.time}`,
  }));
  console.log("🚀 ~ Schedule ~ scheduleData:", companyScheduleData)
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView='dayGridWeek'
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth, timeGridWeek, timeGridDay"
        }}
        events={events}
        eventContent={renderEventContent}
      />
    </div>
  )
}

function renderEventContent(eventInfo) {
  return (
    <div className='flex flex-col justify-center bg-lightgreen px-3 py-1 rounded-md text-white font-semibold'>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </div>
  )
}

export default Schedule