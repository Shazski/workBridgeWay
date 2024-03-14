import { app } from "./presentation/app";
import { PORT } from "./config/index";
import { EnvironmentCheck } from "./utils";
import RabbitMQClient from "./infrastructure/messageBroker/rabbitmq/client";
import { connect } from "./config/index";
import socketConenction from './infrastructure/socket.io/connection'
(async function start() {
  const env = new EnvironmentCheck();

  env.check();
  await connect();
   socketConenction.listen(PORT, () => {
    console.log("socket connected successfully")
   })
  RabbitMQClient.initialize()
})();