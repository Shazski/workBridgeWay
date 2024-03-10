import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";
import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";
import { ErrorResponse, getUserById } from "work-bridge-way-common";
import { JWT_SECRET } from "../../../config";

export default (dependencies: IDependencies) => {
 const { RabbitMqClient } = dependencies;
 const getAllCompanyEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  try {
   const token = req.cookies?.auth_jwt;

   const companyId = getUserById(token, JWT_SECRET!);

   const page = req.query.page;
   const search = req.query.search;
   if (!token || !companyId) {
    return next(
     ErrorResponse.unauthorized("Token is invalid or Token is not available")
    );
   }

  const requestData = {
    companyId,
    page,
    search,
   };
   const employeesList = await RabbitMqClient.Requester(
    requestData,
    rabbitmqConfig.rabbitMq.queues.employee_queue,
    "getAllCompanyEmployees"
   );
   console.log("🚀 ~ employeesList:", employeesList);
   if (!employeesList)
    return next(ErrorResponse.notFound("Employee Data not Found"));

   res.status(200).json(employeesList);
  } catch (error) {
   console.log(
    error,
    "<< Something went wrong in getAllCompanyEmployees Controller >>"
   );
   next(error);
  }
 };
 return getAllCompanyEmployees;
};
