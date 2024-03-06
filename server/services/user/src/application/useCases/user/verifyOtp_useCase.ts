import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";
import { IDependenciesData } from "../../interfaces/IDependenciesData";

export const verifyOtp_useCase = (dependencies: IDependenciesData) => {
  const {
    RabbitMqClient
  } = dependencies;
  try {
    const execute = async (email: string, otp: number) => {
      const otpData = {
        email:email,
        otp:otp
      }
      return await RabbitMqClient.Requester(otpData,rabbitmqConfig.rabbitMq.queues.auth_queue,"verifyOtp")
    };
    return {
      execute,
    };
  } catch (error) {
    console.log("<< Something went wrong in verifyOtp useCase >>");
    return false;
  }
};
