import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";
import { ErrorResponse } from "work-bridge-way-common";
import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";

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
   const emailNotificationData = {
    email: userDetails.email,
    title: "Interview Scheduled",
    body: `Date is ${scheduleData.date} and Time is ${scheduleData.time}`,
   };
   RabbitMqClient.Requester(
    emailNotificationData,
    rabbitmqConfig.rabbitMq.queues.notification_queue,
    "sendInterviewScheduleEmail"
   );

   const updatedJob = await scheduleInterview_useCase(dependencies).execute(
    jobId,
    userId,
    scheduleData
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
