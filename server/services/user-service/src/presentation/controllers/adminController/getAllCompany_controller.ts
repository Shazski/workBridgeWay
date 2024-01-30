import { NextFunction, Request, Response } from "express";
import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";
import { ErrorResponse } from "../../../utils";

export = (dependencies: IDependenciesData) => {
    const {admin_useCase:{getAllCompany_useCase}} = dependencies
    const getAllCompany = async(req:Request, res:Response, next:NextFunction) => {
        try {
            const companyData =  await getAllCompany_useCase(dependencies).execute() 
            if(!companyData) return next(ErrorResponse.notFound("No Data found on database"))

            res.status(200).json(companyData)
        } catch (error) {
            console.log(error,"<<Something went wrong in get all company details controller>>")
            next(error)
        }
    }
    return getAllCompany 
}