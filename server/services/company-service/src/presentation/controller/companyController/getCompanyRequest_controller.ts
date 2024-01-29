import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";
import Company from "../../../infrastructure/database/mongodb/schema/companySchema";

export = (dependencies: IDependencies) => {
    const getCompanyRequests = async(req:Request, res:Response, next:NextFunction) => {
        try {
            const data = await Company.find()
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }

    return getCompanyRequests
}