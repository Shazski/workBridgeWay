import { NextFunction, Request, Response } from "express";
import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";
import { ErrorResponse, getUserById } from "work-bridge-way-common";
import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";

export = (dependencies: IDependenciesData) => {
 const {
 RabbitMqClient,
 } = dependencies;
 const getCompanyById = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {

const companyId = req.query.companyId
  try {
   const companyDetails = await RabbitMqClient.Requester(companyId,rabbitmqConfig.rabbitMq.queues.company_queue,"getCompanyById")

   if (!companyDetails)
    return next(ErrorResponse.notFound("companyId Id is invalid"));

   res.status(200).json(companyDetails);
  } catch (error) {
   next(error);
  }
 };
 return getCompanyById;
};
