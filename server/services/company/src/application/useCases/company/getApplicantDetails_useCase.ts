import { ObjectId } from "mongoose";
import { IDependencies } from "../../interface/IDependencies";
import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";

export const getApplicantDetails_useCase = (dependencies: IDependencies) => {
 const { RabbitMqClient } = dependencies;

 const execute = async (userId: ObjectId) => {
  try {
   return await RabbitMqClient.Requester( userId, rabbitmqConfig.rabbitMq.queues.user_queue,"getUserById");
  } catch (error) {
   console.log(error, "<< Something went wrong in getAllApplicants_useCase >>");
   return false;
  }
 };
 return { execute };
};
