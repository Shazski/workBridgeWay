import { app } from "./presentation/app";
import { PORT } from "./config/index";
import { EnvironmentCheck } from "./utils";
import RabbitMQClient from "./infrastructure/messageBroker/rabbitmq/client";
import { connect } from "./config/index";

(async function start() {
  const env = new EnvironmentCheck();

  env.check();
  await connect();
  app.listen(PORT, () => {
    console.log(`User service is running on port ${PORT}`)
    RabbitMQClient.initialize()
  })
})();