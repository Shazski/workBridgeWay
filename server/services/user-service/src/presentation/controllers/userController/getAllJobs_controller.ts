import { NextFunction, Request, Response } from "express";
import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";
import { ErrorResponse } from "../../../utils";
import { IJob } from "../../../application/interfaces/IJob"; 
export = (dependencies: IDependenciesData) => {
  const {
    user_useCase: { getAllJobs_useCase },
  } = dependencies;
  const getAllJobs_controller = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const page = req.query.page || 1;
    const filters = req.query.filter || "";
    const search = req.query.search || ""
    const data = {
        page,
        filters,
        search
    }
    console.log(data,"my data in controller get all jobs")
    try {
      const jobs: IJob[] = await getAllJobs_useCase(dependencies).execute(
        data
      );
      if (!jobs)
        return next(ErrorResponse.internalError("failed to fetch jobs"));

      res.status(201).json(jobs);
    } catch (error) {
      console.log("<<Something went wrong in getAllJobs_controller>>");
      next(error);
    }
  };
  return getAllJobs_controller;
};
