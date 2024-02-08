import RabbitMQClient from "../../infrastructure/messageBroker/rabbitmq/client";

interface useCaseData {
  updateCompany_useCase: any;
}

interface companyRepoData {
  registerCompany: any;
  findCompanyByEmail: any;
  getAllCompanyData_repo: any;
  updateRequest: any;
  updateCompany_repo: any;
}

export interface IDependencies {
  company_useCase: useCaseData;
  company_repo: companyRepoData;
  RabbitMqClient: typeof RabbitMQClient;
}
