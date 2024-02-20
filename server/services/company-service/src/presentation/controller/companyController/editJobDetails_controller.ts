import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";
import ErrorResponse from "../../../utils/error/errorResponse";

export default (dependencies: IDependencies) => {
    const {job_useCase:{editJobDetails_useCase}} = dependencies
    const editJob = async(req: Request, res:Response, next:NextFunction) => {
        const jobDetails = req.body
        try {
         const updatedJob = await editJobDetails_useCase(dependencies).execute(jobDetails)

         if(!updatedJob) return next(ErrorResponse.badRequest("Job Details is not edited"))

         res.status(201).json(updatedJob)
        } catch (error) {
            console.log(error,"<< Something went wrong in editjobDetails controller >>")
            next(error)
        }
    }

    return editJob
}