import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";
import { getUserById, ErrorResponse } from "work-bridge-way-common";
import { JWT_SECRET } from "../../../config";

export = (dependecies: IDependencies) => {
  const {
    job_useCase: { postJob_useCase },
  } = dependecies;
  const postJob = (req: Request, res: Response, next: NextFunction) => {
    const credentials = req.body;
    try {
      const token = req.cookies["auth_jwt"];
      const companyId: string | boolean= getUserById(token, JWT_SECRET!);

      if (!token || !companyId) {
        return next(ErrorResponse.unauthorized("Company Autherization failed"));
      }
      const jobData = postJob_useCase(dependecies).execute(
        credentials,
        companyId
      );

      if (!jobData) return next(ErrorResponse.notFound("Job is not posted"));

      res
        .status(201)
        .json({ success: true, message: "job successfully posted" });
    } catch (error) {
      console.log(error, "<< Something went wrong in postjob controller >>");
      next(error);
    }
  };
  return postJob
};
