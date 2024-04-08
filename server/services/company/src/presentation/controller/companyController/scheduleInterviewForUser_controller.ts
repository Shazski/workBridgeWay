import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";
import { ErrorResponse } from "work-bridge-way-common";
import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";
import mongoose, { Mongoose } from "mongoose";

export default (dependencies: IDependencies) => {
 const {
  job_useCase: { scheduleInterview_useCase },
  RabbitMqClient,
 } = dependencies;
 const scheduleInterviewForUser = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  const scheduleData: {
   testType: string;
   date: string;
   time: string;
   employee: string;
  } = req.body;

  const multipleTimeSlot: {
   date2: string;
   time2: string;
   date3: string;
   time3: string;
  } = req.body;
  const jobId = req.query.jobId;
  const userId = req.query.userId;

  try {
   const userDetails: any = await RabbitMqClient.Requester(
    userId,
    rabbitmqConfig.rabbitMq.queues.user_queue,
    "getUserById"
   );
   const notificationData = {
    fmcToken: userDetails.fmcToken,
    title: "Interview Scheduled",
    body: `Date is ${scheduleData.date} and Time is ${scheduleData.time}`,
   };
   RabbitMqClient.Requester(
    notificationData,
    rabbitmqConfig.rabbitMq.queues.notification_queue,
    "sendNotifications"
   );

   const updatedJob = await scheduleInterview_useCase(dependencies).execute(
    jobId,
    userId,
    scheduleData
   );
   const length =
    updatedJob?.applicants?.find(
     (applicant: any) => String(applicant.applicantId) === String(userId)
    ).schedule.length - 1;
   const scheduleId = updatedJob?.applicants?.find(
    (applicant: any) => String(applicant.applicantId) === String(userId)
   ).schedule[length]._id;

   const emailNotificationData = {
    email: userDetails.email,
    title: "Interview Scheduled",
    body: `Date is ${scheduleData.date} and Time is ${scheduleData.time} and another Dates are <br> ${multipleTimeSlot.date2}  and Time is ${multipleTimeSlot.time2} <a href='http://localhost:3001/api/v1/user/confirmSlot/${multipleTimeSlot.date2}/${multipleTimeSlot.time2}/${userId}/${scheduleId}/${jobId}'}>Time 2</a> <br> ${multipleTimeSlot.date3} and Time is ${multipleTimeSlot.time3} <a href='http://localhost:3001/api/v1/user/confirmSlot/${multipleTimeSlot.date3}/${multipleTimeSlot.time3}/${userId}/${scheduleId}/${jobId}'}>Time 3</a> <br> Select your preffered time`,
   };

   RabbitMqClient.Requester(
    emailNotificationData,
    rabbitmqConfig.rabbitMq.queues.notification_queue,
    "sendInterviewScheduleEmail"
   );

   if (!updatedJob)
    return next(ErrorResponse.badRequest("Not able to update the status"));

   res.status(201).json(updatedJob);
  } catch (error) {
   console.log(
    error,
    "<< Something went wrong in scheduleInterviewForUser controller >>"
   );
   next(error);
  }
 };

 return scheduleInterviewForUser;
};
