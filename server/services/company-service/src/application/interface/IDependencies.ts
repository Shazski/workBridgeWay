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
interface categoryRepoData {
  addCategory: any;
}
interface jobRepoData {
  postJob: any;
}
interface jobUseCaseData {
  postJob_useCase: any;
}
interface categoryUseCaseData {
  addCategory_useCase: any;
}

export interface IDependencies {
  company_useCase: useCaseData;
  job_useCase: jobUseCaseData;
  company_repo: companyRepoData;
  job_repo: jobRepoData;
  category_repo: categoryRepoData;
  category_useCase: categoryUseCaseData;
  RabbitMqClient: typeof RabbitMQClient;
}
