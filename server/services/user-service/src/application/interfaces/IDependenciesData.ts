import RabbitMqClient from '../../infrastructure/messageBroker/rabbitmq/client'

interface useCaseData {
  editUser_useCase: any;
  findUserByEmail_useCase: any;
  sendOtp_useCase: any;
  verifyOtp_useCase: any;
  addUserSkills_useCase: any;
  removeUserSkill_useCase: any;
  updateUserAbout_useCase: any;
  addUserSocialLinks_useCase: any;
  removeUserSocialLinks_useCase: any;
  getAllJobs_useCase:any;
  getJobDescription_useCase:any;
}

export interface userRepoData {
  findUserByEmail_repo: any;
  SignUpUser_repo: any;
  editUser_repo: any;
  addUserSkills_repo: any;
  removeUserSkills_repo: any;
  updateUserAbout_repo: any
  addUserSocialLinks_repo: any
  removeUserSocialLinks_repo: any
}

interface adminUseCaseData {
  getAllCompany_useCase:any
  updateCompanyRequest_useCase: any
}

interface categoryUseCaseData {
  addCategory_useCase: any;
  getCategoryByCompany: any;
}

interface categoryRepoData {
  addCategory: any;
  getCategoryByCompany: any;
}

export interface IDependenciesData {
  user_useCase: useCaseData;
  admin_useCase:adminUseCaseData;
  category_useCase: categoryUseCaseData;
  categoryRepo:categoryRepoData;
  userRepo: userRepoData;
  RabbitMqClient:typeof RabbitMqClient
}
