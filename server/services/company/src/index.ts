import { PORT } from "./config";
import app from "./presentation/app";
import { EnvironmentCheck } from "./utils/envChecker/envCheck";
import { connect } from "./config";
import RabbitMQClient from "./infrastructure/messageBroker/rabbitmq/client";
(function async() {
  try {
    //env checker
    const env = new EnvironmentCheck();
    env.checkEnv();
    //connect to db
    connect();
    //rabbitmq connection
    RabbitMQClient?.initialize();

    app.listen(PORT, () => {
      console.log(`company service connected to ${PORT}`);
    });
  } catch (e) {
    console.error("<< Something went wrong in server >>", e);
  }
})();
