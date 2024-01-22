import { IUser } from "../../../domain/entities/user.entity";
import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";
import { DependenciesData } from "../../interfaces/IDependencies";
export const signUpUser_useCase = (dependencies: DependenciesData) => {
  const { RabbitMQClient } = dependencies;

  if (!RabbitMQClient) throw new Error("Rabbitmq dependency is required");

  const execute = async (userCredentials: IUser) => {
    return await RabbitMQClient.Requester(
      userCredentials,
      rabbitmqConfig.rabbitMq.queues.user_queue,
      "userSignUp"
    );
  };
  return {
    execute,
  };
};
