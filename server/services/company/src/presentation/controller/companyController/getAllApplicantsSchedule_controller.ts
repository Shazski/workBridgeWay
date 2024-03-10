import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";
import { ErrorResponse, getUserById } from "work-bridge-way-common";
import { JWT_SECRET } from "../../../config";

export default (dependencies: IDependencies) => {
 const getAllApplicantsSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  const {
   job_useCase: { getAllApplicantScheduleDate_useCase },
  } = dependencies;
  try {
   const token = req?.cookies?.auth_jwt;

   const companyId = getUserById(token, JWT_SECRET!);

   if (!token || !companyId) {
    return next(
     ErrorResponse.unauthorized("Token is invalid or Token is not available")
    );
   }

   const scheduleData = await getAllApplicantScheduleDate_useCase(
    dependencies
   ).execute(companyId);

   console.log("🚀 ~ scheduleData:", scheduleData);

   if (!scheduleData)
    return next(ErrorResponse.notFound("No scheduleData found"));
   res.status(200).json(scheduleData);
  } catch (error) {
   console.log(
    error,
    "<< Something went wrong in getAllApplicantsSchedule controller >>"
   );
   next(error);
  }
 };
 return getAllApplicantsSchedule;
};
