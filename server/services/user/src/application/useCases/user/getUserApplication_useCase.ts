
import { ObjectId } from "mongoose";
import { IDependenciesData } from "../../interfaces/IDependenciesData";
import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";

export const getUserApplications_useCase = (dependencies: IDependenciesData) => {
 const { RabbitMqClient } = dependencies;
 const execute = async (userId: any) => {
  try {
   const applications = await RabbitMqClient.Requester(
    userId,
    rabbitmqConfig.rabbitMq.queues.company_queue,
    "getUserApplications"
   );

   if (!applications) {
    return false;
   }
   return applications;
  } catch (error) {
   console.log(error, " << Something went wrong in applyforjob useCase >> ");
   return false;
  }
 };
 return { execute };
};
