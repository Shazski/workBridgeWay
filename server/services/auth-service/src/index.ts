import { PORT } from "./config"
import { app } from "./presentation/app"
import { EnvironmentChecker } from "./utils"
import RabbitMQClient from "./infrastructure/messageBroker/rabbitmq/client"
import { connect } from "./config/database/connection"
(async function start() {
    try {
        const env = new EnvironmentChecker()

        await env.check()
        // Connect to database
        await connect()
        //connect to messagebroker
        RabbitMQClient?.initialize()

        app.listen(PORT, () => {
            console.log(`Auth Service is running on port ${PORT}`)
        })
    } catch (error) {
        console.log(error, "<< Something Went Wrong Try Restarting The Server >>");
    }
})()