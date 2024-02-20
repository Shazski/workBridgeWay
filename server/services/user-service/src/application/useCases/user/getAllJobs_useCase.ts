import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";
import { IDependenciesData } from "../../interfaces/IDependenciesData";
import { IUpdateUser } from "../../interfaces/interfaces";

export const getAllJobs_useCase = (dependencies: IDependenciesData) => {
  const {
    RabbitMqClient,
  } = dependencies;
  const execute = async (userCredentails: IUpdateUser) => {
    try {
     return await RabbitMqClient.Requester(userCredentails,rabbitmqConfig.rabbitMq.queues.company_queue,"getAllJobs")
    } catch (error) {
        console.log(error, "<< Something went wrong in getAllJobs_useCase >>");
      return false;
    }
  };
  return {
    execute,
  };
};
