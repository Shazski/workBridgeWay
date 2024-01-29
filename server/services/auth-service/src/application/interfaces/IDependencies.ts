import  RabbitMQClient  from "../../infrastructure/messageBroker/rabbitmq/client"

export interface useCaseData {
    findUserByEmail_useCase: any;
    signUpUser_useCase : any;
    sendOtp_useCase: any;
    verifyOtp_useCase: any;
    registerCompany_useCase: any;
}

export interface otpRepoData {
    saveOtp: any
    verifyOtp: any
}

export interface DependenciesData{
    user_useCase: useCaseData
    RabbitMQClient : typeof RabbitMQClient
    otpRepo: otpRepoData
}
