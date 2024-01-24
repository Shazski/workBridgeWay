import RabbitMqClient from '../../infrastructure/messageBroker/rabbitmq/client'

interface useCaseData {
  editUser_useCase: any;
  findUserByEmail_useCase: any
}

export interface userRepoData {
  findUserByEmail_repo: any;
  SignUpUser_repo: any;
  editUser_repo: any;
}

export interface IDependenciesData {
  user_useCase: useCaseData;
  userRepo: userRepoData;
  RabbitMqClient:typeof RabbitMqClient
}
