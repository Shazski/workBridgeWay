import express from 'express'
import companyRoute from './company.route'
import { IDependencies } from '../../application/interface/IDependencies'
export default (dependencies: IDependencies) => {
    const routes = express.Router()

    routes.use('/company', companyRoute(dependencies))

    return routes
}