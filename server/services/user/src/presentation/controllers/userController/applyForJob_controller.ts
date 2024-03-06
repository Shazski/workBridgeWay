import { NextFunction, Request, Response } from "express";
import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";
import { ErrorResponse } from "work-bridge-way-common";

export = (dependencies: IDependenciesData) => {
 const {
  user_useCase: { applyForJobUseCase, findUserInApplicants_useCase },
 } = dependencies;
 const applyForJob = async (req: Request, res: Response, next: NextFunction) => {
  const appliedCredentials = req.body
  try {
    const userAppliedOrNot = await findUserInApplicants_useCase(dependencies).execute(appliedCredentials)
    if(userAppliedOrNot) {
      return next(ErrorResponse.conflict("You have already applied to this job"))
    }
    
   const applied = await applyForJobUseCase(dependencies).execute(appliedCredentials);

   if (!applied) return next(ErrorResponse.badRequest("Job Id is invalid"));
   res.status(200).json(applied);
  } catch (error) {
   next(error);
  }
 };
 return applyForJob;
};
