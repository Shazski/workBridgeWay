import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";
import { ErrorResponse } from "work-bridge-way-common";

export default (dependencies: IDependencies) => {
 const {
  job_useCase: { cancelInterviewForUser_useCase },
 } = dependencies;
 const cancelInterviewForUser = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  const { scheduleId } = req.body;
  const jobId = req.query.jobId;
  const userId = req.query.userId;

  try {
   const updatedJob = await cancelInterviewForUser_useCase(
    dependencies
   ).execute(jobId, userId, scheduleId);

   if (!updatedJob)
    return next(ErrorResponse.badRequest("Not able to cancel Interview"));

   res.status(201).json(updatedJob);
  } catch (error) {
   console.log(
    error,
    "<< Something went wrong in cancelInterviewForUser controller >>"
   );
   next(error);
  }
 };

 return cancelInterviewForUser;
};
