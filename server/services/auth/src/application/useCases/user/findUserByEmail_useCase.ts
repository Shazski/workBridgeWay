import { IUser } from "../../../domain/entities/user.entity";
import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";
import { DependenciesData } from "../../interfaces/IDependencies";

export const findUserByEmail_useCase = (dependencies: DependenciesData) => {
  const { RabbitMQClient } = dependencies;

  if (!RabbitMQClient) throw new Error("Rabbitmq dependency is required");
  try {
    const execute = (userCredentials: IUser) => {
      console.log("🚀 ~ execute ~ userCredentials:", userCredentials)
      return RabbitMQClient.Requester(
        userCredentials,
        rabbitmqConfig.rabbitMq.queues.user_queue,
        "userExist"
      );
    };
    return {
      execute,
    };
  } catch (error) {
    console.log(error, "<< Something went wrong in findUserByEmail usecase>>");
    return false;
  }
};
