import { PORT } from "./config"
import { app } from "./presentation/app"
import { EnvironmentChecker } from "./utils"
import RabbitMQClient from "./infrastructure/messageBroker/rabbitmq/client"
(async function start() {
    try {
        const env = new EnvironmentChecker()

        await env.check()
        RabbitMQClient?.initialize()
        app.listen(PORT, () => {
            console.log(`Auth Service is running on port ${PORT}`)
        })
    } catch (error) {
        console.log(error, "<< Something Went Wrong Try Restarting The Server >>");
    }
})()