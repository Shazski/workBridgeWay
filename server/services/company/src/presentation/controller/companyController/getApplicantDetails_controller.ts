import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";
import { getUserById } from "work-bridge-way-common";
import { ErrorResponse } from "work-bridge-way-common";
import { JWT_SECRET } from "../../../config";

export default (dependencies: IDependencies) => {
 const {
  company_useCase: { getApplicantDetails_useCase },
 } = dependencies;

 const getApplicantDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  try {
    
   const userId = req.query.userId;
   const applicant = await getApplicantDetails_useCase(dependencies).execute(
    userId
   );

   if (!applicant)
    return next(ErrorResponse.badRequest("applicants not found"));

   res.status(200).json(applicant);
  } catch (error) {
   console.log(
    error,
    "<< Something went wrong in getcompanyjobs controller >>"
   );
   next(error);
  }
 };

 return getApplicantDetails;
};
