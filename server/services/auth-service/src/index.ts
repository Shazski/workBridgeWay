import { PORT } from "./config"
import { app } from "./presentation/app"
import { EnvironmentChecker } from "./utils"


(async function start() {
    try {
        const env = new EnvironmentChecker()

        await env.check()

        app.listen(PORT, () => {
            console.log(`Auth Service is running on port ${PORT}`)
        })
    } catch (error) {
        console.log(error, "<< Something Went Wrong Try Restarting The Server >>");
    }
})()