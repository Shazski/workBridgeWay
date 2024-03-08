import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";
import { ErrorResponse } from "work-bridge-way-common";

export default (dependencies: IDependencies) => {
 const {
  job_useCase: { updateApplicantJobStatus_useCase },
 } = dependencies;
 const updateApplicantStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  const { stage } = req.body;
  const jobId = req.query.jobId;
  const applicantId = req.query.applicantId;

  try {
   const updatedJob = await updateApplicantJobStatus_useCase(dependencies).execute(
    applicantId,
    jobId,
    stage
   );

   if (!updatedJob)
    return next(ErrorResponse.badRequest("Not able to update the status"));

   res.status(201).json(updatedJob);
  } catch (error) {
   console.log(
    error,
    "<< Something went wrong in updateApplicantStatus controller >>"
   );
   next(error);
  }
 };

 return updateApplicantStatus;
};
