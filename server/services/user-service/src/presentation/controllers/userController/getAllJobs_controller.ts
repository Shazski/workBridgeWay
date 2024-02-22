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
  const {
   page,
   category,
   typeOfEmployment,
   search,
   fromSalary,
   toSalary,
  }: any = req.query;
  let filter: any = {};
  if (category) {
     filter.category = { $in: category.split(",") };
  }
     if (typeOfEmployment)
   filter.typeOfEmployment = { $in: typeOfEmployment.split(",") };
  if (toSalary) filter.toSalary = toSalary
  if (fromSalary) filter.fromSalary = fromSalary 
  if (search !== undefined) {
    filter.jobTitle = { $regex: search, $options: 'i' };
  }
  if(page) {
    filter.page = Number(page) || 1;
  }

  try {
   const jobs: IJob[] = await getAllJobs_useCase(dependencies).execute(filter);
   if (!jobs) return next(ErrorResponse.internalError("failed to fetch jobs"));

   res.status(200).json(jobs);
  } catch (error) {
   console.log("<<Something went wrong in getAllJobs_controller>>");
   next(error);
  }
 };
 return getAllJobs_controller;
};
