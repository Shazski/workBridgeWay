import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";
import { IDependenciesData } from "../../interfaces/IDependenciesData";

export const updateCompanyRequest_useCase = (
  dependencies: IDependenciesData
) => {
  const { RabbitMqClient } = dependencies;
  const execute = (credentials: { email: string; stage: string }) => {
    try {
      const success = RabbitMqClient.Requester(
        credentials,
        rabbitmqConfig.rabbitMq.queues.company_queue,
        "updateRequest"
      );

      if (!success) return false;

      return true;
      
    } catch (error) {
      console.log(
        error,
        "<<Something went wrong in updateCompanyRequest useCase>>"
      );
      return false;
    }
  };
  return {
    execute,
  };
};
