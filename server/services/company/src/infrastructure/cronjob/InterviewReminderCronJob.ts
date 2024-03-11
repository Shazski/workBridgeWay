import cron from "node-cron";
import { IJobsData } from "../database/mongodb/schema/jobSchema";
import { IDependencies } from "../../application/interface/IDependencies";
import rabbitmqConfig from "../messageBroker/rabbitmq/rabbitmq.config";

export default (dependencies: IDependencies) => {
 const {
  job_repo: { getAllJobsForScheduleMail },
  RabbitMqClient,
  company_useCase: { getApplicantDetails_useCase },
 } = dependencies;

 cron.schedule("0 0 * * *", async () => {
  try {
   const currentDate = new Date();
   currentDate.setDate(currentDate.getDate() + 1);

   const jobs: IJobsData[] = await getAllJobsForScheduleMail(currentDate);

   if (jobs && jobs.length > 0) {
    jobs.forEach((job: IJobsData) => {
     job?.applicants?.forEach(async (applicant: any) => {
      if (applicant?.schedule && applicant.schedule.length > 0) {
       applicant.schedule.forEach(async (scheduledItem: any) => {
        if (scheduledItem.date && scheduledItem.time) {
         const dateParts = scheduledItem.date.split("-");
         const timeParts = scheduledItem.time.split(":");

         if (dateParts.length === 3 && timeParts.length === 2) {
          const scheduleDate = new Date(
           parseInt(dateParts[0]),
           parseInt(dateParts[1]) - 1,
           parseInt(dateParts[2]),
           parseInt(timeParts[0]),
           parseInt(timeParts[1])
          );

          if (scheduleDate instanceof Date && !isNaN(scheduleDate.valueOf())) {
           const oneDayBefore = new Date(scheduleDate);
           oneDayBefore.setDate(oneDayBefore.getDate() - 1);

           const formattedScheduleDate = `${scheduleDate.getFullYear()}-${(
            scheduleDate.getMonth() + 1
           )
            .toString()
            .padStart(2, "0")}-${scheduleDate
            .getDate()
            .toString()
            .padStart(2, "0")}`;

           if (
            currentDate.toISOString().split("T")[0] === formattedScheduleDate
           ) {
            const emailSubject = "Scheduled Test Reminder";
            const emailText = `Dear ${applicant.name},\n\nThis is a reminder for your scheduled test on ${scheduledItem.date} at ${scheduledItem.time}.\n\nBest regards,\nThe Hiring Team`;
            const userData = await getApplicantDetails_useCase(
             dependencies
            ).execute(applicant.applicantId);
            const emailNotificationData = {
             email: userData.email,
             title: emailSubject,
             body: emailText,
            };
            RabbitMqClient.Requester(
             emailNotificationData,
             rabbitmqConfig.rabbitMq.queues.notification_queue,
             "sendInterviewScheduleEmail"
            );
            const notificationData = {
             fmcToken: userData.fmcToken,
             title: emailText,
             body: emailText,
            };
            RabbitMqClient.Requester(
             notificationData,
             rabbitmqConfig.rabbitMq.queues.notification_queue,
             "sendNotifications"
            );
           }
          } else {
           console.warn("Invalid scheduleDate for applicant:", applicant);
          }
         } else {
          console.warn("Invalid date or time format for applicant:", applicant);
         }
        } else {
         console.warn("Missing date or time for applicant:", applicant);
        }
       });
      } else {
       console.warn("Missing schedule for applicant:", applicant);
      }
     });
    });
   }
  } catch (error) {
   console.log(error, "<< Something went wrong in Sending reminder email >>");
  }
 });
};
