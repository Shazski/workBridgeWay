import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";
import { ICompanyData } from "../../interfaces/ICompanyLogin";
import { DependenciesData } from "../../interfaces/IDependencies";

export const registerCompany_useCase = (dependencies: DependenciesData) => {
  const { RabbitMQClient } = dependencies;
  if (!RabbitMQClient) throw new Error("Rabbitmq dependency is required");
  const execute = async (companyCredentials: ICompanyData) => {
    try {
      const company = await RabbitMQClient.Requester(
        companyCredentials,
        rabbitmqConfig.rabbitMq.queues.company_queue,
        "registerCompany"
      );
        console.log(company)
      if (!company) return false;

      return company
    } catch (error) {
      console.log("<< Something went wrong in company resgister useCase >>");
      return false;
    }
  };
  return {
    execute,
  };
};
