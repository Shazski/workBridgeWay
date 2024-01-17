import { IUser } from "../../../domain/entities/user.entity";
import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";
export const signUpUser_useCase = (dependencies: any) => {
  const { RabbitMQClient } = dependencies;

  if (!RabbitMQClient) throw new Error("Rabbitmq dependency is required");

  const execute = async (userCredentials: IUser) => {
    console.log(userCredentials, "this is my email");
    return await RabbitMQClient.Requester(
      userCredentials,
      rabbitmqConfig.rabbitMq.queues.user_queue,
      "userSignUp"
    );
  };
  console.log(execute,"executefdsfasdfasdasdasda")
  return {
    execute,
  };
};
