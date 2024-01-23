import express from 'express'
import companyRoute from './company.route'
export = (dependencies: any) => {
    const routes = express.Router()

    routes.use('/company', companyRoute(dependencies))

    return routes
}