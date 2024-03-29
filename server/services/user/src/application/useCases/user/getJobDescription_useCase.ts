import { ObjectId } from "mongoose";
import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";
import { IDependenciesData } from "../../interfaces/IDependenciesData";

export const getJobDescription_useCase = (dependencies: IDependenciesData) => {
  const {
   RabbitMqClient,
  } = dependencies;
  const execute = async (id:ObjectId) => {
    try {
      const jobData = await RabbitMqClient.Requester(id, rabbitmqConfig.rabbitMq.queues.company_queue,"getJobById")
      if(!jobData) return false
      return jobData
    } catch (error) {
      console.log("<<Something went wrong in getJobDescription_useCase>>");
      return false
    }
  };
  return {
    execute,
  };
};
