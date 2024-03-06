import { ObjectId } from "mongoose";
import { IDependenciesData } from "../../interfaces/IDependenciesData";
import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";

export const findUserInApplicants_useCase = (dependencies: IDependenciesData) => {
 const { RabbitMqClient } = dependencies;
 const execute = async (applicantCredentials: any) => {
  try {
   const applied = await RabbitMqClient.Requester(
    applicantCredentials,
    rabbitmqConfig.rabbitMq.queues.company_queue,
    "checkUserInApplicants"
   );
   if (!applied) {
    return false;
   }
   return true;
  } catch (error) {
   console.log(error, " << Something went wrong in findUserInApplicants_useCase >> ");
   return false;
  }
 };
 return { execute };
};
