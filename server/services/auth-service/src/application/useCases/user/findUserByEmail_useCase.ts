import rabbitmqConfig from "../../../infrastructure/messageBroker/rabbitmq/rabbitmq.config";

export const findUserByEmail_useCase = (dependencies: any) => {
  const { RabbitMQClient } = dependencies;

  if (!RabbitMQClient) throw new Error("Rabbitmq dependency is required");

  const execute = (email: string) => {
    console.log(email, "this is my email");
    return RabbitMQClient.Requester(
      email,
      rabbitmqConfig.rabbitMq.queues.user_queue,
      "userExist"
    );
  };
  return {
    execute,
  };
};
