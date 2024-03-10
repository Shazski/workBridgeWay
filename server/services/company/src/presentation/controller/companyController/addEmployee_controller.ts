import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";
import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";
import { ErrorResponse, getUserById } from "work-bridge-way-common";
import { JWT_SECRET } from "../../../config";

export default (dependencies: IDependencies) => {
 const { RabbitMqClient } = dependencies;
 const addEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  const employeeCredentials = req.body;
  console.log("🚀 ~ employeeCredentials:", employeeCredentials);

  try {
   const token = req.cookies?.auth_jwt;

   const companyId = getUserById(token, JWT_SECRET!);

   if (!token || !companyId) {
    return next(
     ErrorResponse.unauthorized("Token is invalid or Token is not available")
    );
   }

   const employeeData = {
    userName: req.body.name,
    email: req.body.email,
    role: "employee",
    password: req.body.password,
   };

   const employee: any = await RabbitMqClient.Requester(
    employeeData,
    rabbitmqConfig.rabbitMq.queues.user_queue,
    "userSignUp"
   );

   if (!employee) {
    return next(ErrorResponse.badRequest("Employee Already exists"));
   }

   employeeCredentials.companyId = companyId;
   employeeCredentials._id = employee._id;

   const newEmployee: any = await RabbitMqClient.Requester(
    employeeCredentials,
    rabbitmqConfig.rabbitMq.queues.employee_queue,
    "addEmployee"
   );

   res.status(201).json(newEmployee);
  } catch (error) {
   console.log(error, "<< Something went wrong in add employee controller >>");
   next(error);
  }
 };

 return addEmployee;
};
