import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";
import { ErrorResponse } from "work-bridge-way-common";

export default (dependencies: IDependencies) => {
 const {
  job_useCase: { scheduleInterview_useCase },
 } = dependencies;
 const scheduleInterviewForUser = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  const scheduleData: {
   testType: string;
   date: string;
   time: string;
   employee: string;
  } = req.body;
  const jobId = req.query.jobId;
  const userId = req.query.userId;

  console.log(req.query, "updated data");
  try {
   const updatedJob = await scheduleInterview_useCase(dependencies).execute(
    jobId,
    userId,
    scheduleData
   );

   if (!updatedJob)
    return next(ErrorResponse.badRequest("Not able to update the status"));

   res.status(201).json(updatedJob);
  } catch (error) {
   console.log(
    error,
    "<< Something went wrong in scheduleInterviewForUser controller >>"
   );
   next(error);
  }
 };

 return scheduleInterviewForUser;
};
