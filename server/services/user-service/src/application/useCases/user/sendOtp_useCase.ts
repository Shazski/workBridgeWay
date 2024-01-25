import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";
import { sendOtp } from "../../../utils";
import { IDependenciesData } from "../../interfaces/IDependenciesData";

export const sendOtp_useCase = (dependencies: IDependenciesData) => {
  const { RabbitMqClient } = dependencies;
  const execute = async (email: string, otp: number) => {
    try {
      const success = sendOtp(email, otp);

      if (!success) return false;
      // Send OTP to the Queue for further processing.
      const userCredentials = {
        email,
        otp,
      };
      const otpStored = await RabbitMqClient.Requester(
        userCredentials,
        rabbitmqConfig.rabbitMq.queues.auth_queue,
        "saveOtp"
      );

      if (!otpStored) return false;

      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    execute,
  };
};
