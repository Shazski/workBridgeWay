import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";
import { IDependenciesData } from "../../interfaces/IDependenciesData";

export const getPreferredJobs_useCase = (dependencies: IDependenciesData) => {
 const { RabbitMqClient } = dependencies;
 const execute = async (userCredentials: {
  preferredCategory: string;
  skills: string[];
 }) => {
  try {
   return await RabbitMqClient.Requester(
    userCredentials,
    rabbitmqConfig.rabbitMq.queues.company_queue,
    "getPreferredJobs"
   );
  } catch (error) {
   console.log(error, "<< Something went wrong in getPreferredJobs_useCase >>");
   return false;
  }
 };
 return {
  execute,
 };
};
