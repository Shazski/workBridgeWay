import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";
import { getCompanyId } from "../../../utils/jwt/verifyJwt";
import ErrorResponse from "../../../utils/error/errorResponse";

export default (dependencies: IDependencies) => {
  const {
    job_useCase: { getCompanyJobs_useCase },
  } = dependencies;

  const getJob = async (req: Request, res: Response, next: NextFunction) => {
    const page = req.query.page || 1
    const search = req.query.search || ""
    try {
      const token = req.cookies["auth_jwt"];
      const companyId: string = getCompanyId(token);

      if (!token || companyId === "") {
        return next(ErrorResponse.unauthorized("Company Autherization failed"));
      }
      const jobs = await getCompanyJobs_useCase(dependencies).execute(
        companyId,page,search
      );

      if (!jobs) return next(ErrorResponse.badRequest("Jobs not found"));

      res.status(200).json(jobs);
    } catch (error) {
        console.log(error, "<< Something went wrong in getcompanyjobs controller >>")
        next(error)
    }
  };

  return getJob;
};
