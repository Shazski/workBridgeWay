import RabbitMQClient from '../../infrastructure/messageBroker/rabbitmq/client'

interface useCaseData {

}

interface userRepoData {
    registerCompany: any
    findCompanyByEmail: any
}

export interface IDependencies {
    company_useCase:useCaseData,
    company_repo:userRepoData,
    RabbitMqClient:typeof RabbitMQClient
}