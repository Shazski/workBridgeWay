import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";
import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";
import { ErrorResponse } from "work-bridge-way-common";

export default (dependencies: IDependencies) => {
 const { RabbitMqClient } = dependencies;
 const editEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  const employeeData = req.body;
  try {
   const editedEmployee = await RabbitMqClient.Requester(
    employeeData,
    rabbitmqConfig.rabbitMq.queues.employee_queue,
    "editEmployee"
   );

   if (!editEmployee)
    return next(ErrorResponse.notFound("Not able to edit employee details"));

   res.status(201).json(editedEmployee);
  } catch (error) {
    console.log(error, "<< Something went wrong in edit employee controller >>")
    next(error)
  }
 };

 return editEmployee
};
