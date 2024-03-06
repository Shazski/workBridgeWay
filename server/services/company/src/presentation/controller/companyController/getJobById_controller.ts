import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";
import { ErrorResponse } from "work-bridge-way-common";
import { IJobsData } from "../../../infrastructure/database/mongodb/schema/jobSchema";
import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";

export default (dependencies: IDependencies) => {
  const {
    job_useCase: { getJobById_useCase },
    RabbitMqClient
  } = dependencies;
  const getJobById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    try {
      RabbitMqClient.Requester("",rabbitmqConfig.rabbitMq.queues.notification_queue,"sendNotifications")
      const job:IJobsData = await getJobById_useCase(dependencies).execute(id);

      if (!job) return next(ErrorResponse.badRequest("The JobId is invalid"));
      res.status(200).json(job);
    } catch (error) {
      console.log(error, "<< Something went wrong in getJobById controller >>");
      next(error);
    }
  };
  return getJobById;
};
