import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";
import { getUserById } from "work-bridge-way-common";
import { ErrorResponse } from "work-bridge-way-common";
import { JWT_SECRET } from "../../../config";

export default (dependencies: IDependencies) => {
 const {
  job_useCase: { getCompanyJobs_useCase },
 } = dependencies;

 const getJob = async (req: Request, res: Response, next: NextFunction) => {
  const page = req.query.page || 1;
  const search = req.query.search || "";
  try {
   const token = req.cookies["auth_jwt"];

   const companyId: string | boolean = getUserById(token, JWT_SECRET!);

   if (!token || companyId === "") {
    return next(ErrorResponse.unauthorized("Company Autherization failed"));
   }
   
   const jobs = await getCompanyJobs_useCase(dependencies).execute(
    companyId,
    page,
    search
   );

   if (!jobs) return next(ErrorResponse.badRequest("Jobs not found"));

   res.status(200).json(jobs);
  } catch (error) {
   console.log(
    error,
    "<< Something went wrong in getcompanyjobs controller >>"
   );
   next(error);
  }
 };

 return getJob;
};
