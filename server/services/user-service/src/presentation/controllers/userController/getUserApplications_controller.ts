import { NextFunction, Request, Response } from "express";
import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";
import { ErrorResponse, getUserById } from "work-bridge-way-common";
import { JWT_SECRET } from "../../../config";

export = (dependencies: IDependenciesData) => {
 const {
  user_useCase: { getUserApplications_useCase },
 } = dependencies;
 const getUserApplications = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  const token = req.cookies?.auth_jwt;
  const userId = getUserById(token, JWT_SECRET!);

  if (!token || !userId) {
   return next(ErrorResponse.unauthorized("Not authorized"));
  }
  try {
   const applications = await getUserApplications_useCase(dependencies).execute(
    userId
   );

   if (!applications)
    return next(ErrorResponse.badRequest("User Id is invalid"));

   res.status(200).json(applications);
   
  } catch (error) {
   next(error);
  }
 };
 return getUserApplications;
};
