import { NextFunction, Request, Response } from "express";
import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";
import { ErrorResponse, errorHandler } from "../../../utils";

export = (dependencies: IDependenciesData) => {
 const {
  user_useCase: { getJobDescription_useCase },
 } = dependencies;
 const editUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
   const job = await getJobDescription_useCase(dependencies).execute(id);

   if (!job) return next(ErrorResponse.badRequest("Job Id is invalid"));
   res.status(200).json(job);
  } catch (error) {
   next(error);
  }
 };
 return editUser;
};
