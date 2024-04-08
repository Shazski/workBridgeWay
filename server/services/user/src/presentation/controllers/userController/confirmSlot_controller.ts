import { NextFunction, Request, Response } from "express";
import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";
import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";
import { ErrorResponse } from "work-bridge-way-common";

export default (dependencies: IDependenciesData) => {
 const { RabbitMqClient } = dependencies;
 const confirmSlot = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  const { date, time, userId, scheduleId, jobId } = req.params;

  try {
   const confirmSlot = await RabbitMqClient.Requester(
    { date, time, userId, scheduleId, jobId },
    rabbitmqConfig.rabbitMq.queues.company_queue,
    "confirmSlot"
   );

   if (!confirmSlot)
    return next(ErrorResponse.notFound("Not able to confirm interview slot"));

   res.json({ success: "Your slot has been booked" });
  } catch (error) {
   console.log("<< Somthing went wrong confirm interview Slot controller >>");
   next(error);
  }
 };
 return confirmSlot;
};
