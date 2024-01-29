import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";
import { DependenciesData } from "../../interfaces/IDependencies";

export const findCompanyByEmail_useCase = (dependencies: DependenciesData) => {
  const { RabbitMQClient } = dependencies;
  const execute = async (companyCredentials: {
    email: string;
    password: string;
  }) => {
    try {
        const companyData = await RabbitMQClient.Requester(
            companyCredentials,
            rabbitmqConfig.rabbitMq.queues.company_queue,
            "companyExists"
          );
          if(!companyData) return false

          return companyData
    } catch (error) {
        console.log("<< Something went wrong in find company email usecase >>")
        return false
    }
  };
  return {
    execute,
  };
};
