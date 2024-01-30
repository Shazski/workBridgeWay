import express from "express"
import userRouter from "./user.router"
import { IDependenciesData } from "../../application/interfaces/IDependenciesData"
import adminRouter from "./admin.router"
export = (dependencies: IDependenciesData) => {
    const routes = express.Router()
    routes.use('/user',userRouter(dependencies))
    routes.use('/admin', adminRouter(dependencies))
    return routes
}