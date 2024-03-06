import { ObjectId } from "mongoose";
import { IDependenciesData } from "../../interfaces/IDependenciesData";
import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";

export const applyForJobUseCase = (dependencies: IDependenciesData) => {
 const { RabbitMqClient } = dependencies;
 const execute = async (applicantCredentials: any) => {
  try {
   const applied = await RabbitMqClient.Requester(
    applicantCredentials,
    rabbitmqConfig.rabbitMq.queues.company_queue,
    "appplyForJob"
   );
   if (!applied) {
    return false;
   }
   return true;
  } catch (error) {
   console.log(error, " << Something went wrong in applyforjob useCase >> ");
   return false;
  }
 };
 return { execute };
};
