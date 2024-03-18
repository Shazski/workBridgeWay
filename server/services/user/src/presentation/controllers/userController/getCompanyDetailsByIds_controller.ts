import { NextFunction, Request, Response } from "express";
import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";
import { ErrorResponse, getUserById } from "work-bridge-way-common";
import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";
import { ObjectId } from "mongoose";

export = (dependencies: IDependenciesData) => {
 const { RabbitMqClient } = dependencies;
 const getCompanyById = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  let companyIds: string[] | undefined;

  if (typeof req.query?.companyId === "string") {
   companyIds = req.query.companyId.split(",");
  } else if (Array.isArray(req.query?.companyId)) {
    companyIds = req.query.companyId.join(",").split(",");
  } else {
    companyIds = [];
  }
  try {
   const companyDetails = await RabbitMqClient.Requester(
    companyIds,
    rabbitmqConfig.rabbitMq.queues.company_queue,
    "getCompanyByIds"
   );

   if (!companyDetails)
    return next(ErrorResponse.notFound("companyId Id is invalid"));

   res.status(200).json(companyDetails);
  } catch (error) {
   next(error);
  }
 };
 return getCompanyById;
};
