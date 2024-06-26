import RabbitMQClient from "../../infrastructure/messageBroker/rabbitmq/client";

interface useCaseData {
  updateCompany_useCase: any;
  getApplicantDetails_useCase:any;
}
interface companyRepoData {
  registerCompany: any;
  findCompanyByEmail: any;
  getAllCompanyData_repo: any;
  updateRequest: any;
  updateCompany_repo: any;
  findCompanyById:any;
}

interface jobRepoData {
  postJob: any;
  getAllCompanyJobs: any;
  updateJobStatus: any;
  getJobById: any;
  editJob: any;
  findUserInApplicants:any;
  getUserApplications: any;
  updateApplicantStatus:any;
  findAllExpiredJobs:any;
  updateJobExpiryStatus:any;
  scheduleInterviewForUser:any;
  cancelInterviewForUser:any;
  getAllApplicantsSchedule:any;
  getAllJobsForScheduleMail:any;
  getEmployeeSchedules:any;
}

interface jobUseCaseData {
  postJob_useCase: any;
  getCompanyJobs_useCase: any;
  updateJobStatus_useCase: any;
  getJobById_useCase: any;
  editJobDetails_useCase:any;
  updateApplicantJobStatus_useCase:any;
  scheduleInterview_useCase:any;
  cancelInterviewForUser_useCase:any;
  getAllApplicantScheduleDate_useCase:any;
}



export interface IDependencies {
  company_useCase: useCaseData;
  company_repo: companyRepoData;
  job_useCase: jobUseCaseData;
  job_repo: jobRepoData;
  RabbitMqClient: typeof RabbitMQClient;
}
