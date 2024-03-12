import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ErrorResponse } from "work-bridge-way-common";
import { DependenciesData } from "../../../application/interfaces/IDependencies";
import { JWT_SECRET } from "../../../config";
import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";
import { ObjectId } from "mongoose";

export = (dependencies: DependenciesData) => {
  const {RabbitMQClient} = dependencies
  const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies?.auth_jwt;

      if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }

      const decodedToken = jwt.verify(token, JWT_SECRET!) as { role: string,id:string };

      const userRole = decodedToken.role;
      const empId = decodedToken?.id
      
      if(userRole === "employee") {
        RabbitMQClient.Requester(empId,rabbitmqConfig.rabbitMq.queues.employee_queue,"markCheckOut")
      }
      res.clearCookie("auth_jwt");

      return res.json({ success: true, message: "Successfully logged out", role: userRole });
    } catch (error) {
      console.error(error);
      next(ErrorResponse.badRequest("Something went wrong"));
    }
  };

  return logoutUser;
};
