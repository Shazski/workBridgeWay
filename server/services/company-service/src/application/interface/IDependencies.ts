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
  getCategoryByCompany: any;
}

interface jobRepoData {
  postJob: any;
  getAllCompanyJobs: any;
  updateJobStatus: any;
  getJobById: any;
}

interface jobUseCaseData {
  postJob_useCase: any;
  getCompanyJobs_useCase: any;
  updateJobStatus_useCase: any;
  getJobById_useCase: any;
}

interface categoryUseCaseData {
  addCategory_useCase: any;
  getCategoryByCompany: any;
}

export interface IDependencies {
  company_useCase: useCaseData;
  job_useCase: jobUseCaseData;
  company_repo: companyRepoData;
  job_repo: jobRepoData;
  category_repo: categoryRepoData;
  category_useCase: categoryUseCaseData;
  RabbitMqClient: typeof RabbitMQClient;
  Client: { set: any; get: any; expire: any };
}
