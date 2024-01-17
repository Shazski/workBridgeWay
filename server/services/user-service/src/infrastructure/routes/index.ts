import express from "express"
import userRouter from "./user.router"
export = (dependencies: any) => {
    console.log(dependencies)
    const routes = express.Router()
    routes.use('/user',userRouter(dependencies))
    return routes
}