import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";
import { ErrorResponse } from "work-bridge-way-common";
import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";

export default (dependencies: IDependencies) => {
 const {
  job_useCase: { cancelInterviewForUser_useCase },
  RabbitMqClient,
 } = dependencies;
 const cancelInterviewForUser = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  console.log(req.body, "bodydata");
  const { scheduleId } = req.body;
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
    title: "Interview Canceled",
    body: `The Interview Scheduled is Canceled`,
   };

   RabbitMqClient.Requester(
    notificationData,
    rabbitmqConfig.rabbitMq.queues.notification_queue,
    "sendNotifications"
   );
   const emailNotificationData = {
    email: userDetails.email,
    title: "Interview Scheduled",
    body: `The Interview is canceled that is scheduled! Please check your dashboard for more infromation!!!`,
   };
   RabbitMqClient.Requester(
    emailNotificationData,
    rabbitmqConfig.rabbitMq.queues.notification_queue,
    "sendInterviewScheduleEmail"
   );

   const updatedJob = await cancelInterviewForUser_useCase(
    dependencies
   ).execute(jobId, userId, scheduleId);

   if (!updatedJob)
    return next(ErrorResponse.badRequest("Not able to cancel Interview"));

   res.status(201).json(updatedJob);
  } catch (error) {
   console.log(
    error,
    "<< Something went wrong in cancelInterviewForUser controller >>"
   );
   next(error);
  }
 };

 return cancelInterviewForUser;
};
