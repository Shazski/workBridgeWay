import { Client } from "../../infrastructure/database/redis/client";
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

interface jobRepoData {
  postJob: any;
  getAllCompanyJobs: any;
  updateJobStatus: any;
  getJobById: any;
  editJob: any;
  findUserInApplicants:any;
}

interface jobUseCaseData {
  postJob_useCase: any;
  getCompanyJobs_useCase: any;
  updateJobStatus_useCase: any;
  getJobById_useCase: any;
  editJobDetails_useCase:any;
}



export interface IDependencies {
  company_useCase: useCaseData;
  company_repo: companyRepoData;
  job_useCase: jobUseCaseData;
  job_repo: jobRepoData;
  RabbitMqClient: typeof RabbitMQClient;
  Client: typeof Client;
}
