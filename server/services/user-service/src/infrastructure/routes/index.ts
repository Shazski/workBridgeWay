import express from "express"
import userRouter from "./user.router"
import { IDependenciesData } from "../../application/interfaces/IDependenciesData"
export = (dependencies: IDependenciesData) => {
    console.log(dependencies)
    const routes = express.Router()
    routes.use('/user',userRouter(dependencies))
    return routes
}