import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";
import { IDependenciesData } from "../../interfaces/IDependenciesData";

export const getAllCompany_useCase = (dependencies: IDependenciesData) => {
  const { RabbitMqClient } = dependencies;
  const execute = async () => {
    try {
      const companyData = await RabbitMqClient.Requester(
        "",
        rabbitmqConfig.rabbitMq.queues.company_queue,
        "getAllCompany"
      );
      if(!companyData) return false

      return companyData
    } catch (error) {
        console.log(error,"<<Something went wrong in get company useCase>>")
        return false
    }
  };

  return {
    execute
  }
};
