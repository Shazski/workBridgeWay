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

export interface IDependenciesData {
  user_useCase: useCaseData;
  userRepo: userRepoData;
  RabbitMqClient:typeof RabbitMqClient
}
