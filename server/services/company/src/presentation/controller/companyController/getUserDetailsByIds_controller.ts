import { NextFunction, Request, Response } from "express";
import { ErrorResponse, getUserById } from "work-bridge-way-common";
import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";
import { IDependencies } from "../../../application/interface/IDependencies";

export = (dependencies: IDependencies) => {
 const { RabbitMqClient } = dependencies;
 const getUserByIds = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  let userIds: string[] | undefined;

  if (typeof req.query?.userIds === "string") {
    userIds = req.query.userIds.split(",");
  } else if (Array.isArray(req.query?.userIds)) {
    userIds = req.query.userIds.join(",").split(",");
  } else {
    userIds = [];
  }
  try {
   const UserDetails = await RabbitMqClient.Requester(
    userIds,
    rabbitmqConfig.rabbitMq.queues.user_queue,
    "getUserByIds"
   );

   if (!UserDetails)
    return next(ErrorResponse.notFound("companyId Id is invalid"));

   res.status(200).json(UserDetails);
  } catch (error) {
   next(error);
  }
 };
 return getUserByIds;
};
