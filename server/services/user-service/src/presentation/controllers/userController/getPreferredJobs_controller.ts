import { NextFunction, Request, Response } from "express";
import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";
import { ErrorResponse, getUserById } from "work-bridge-way-common";
import { JWT_SECRET } from "../../../config";

export default (dependencies: IDependenciesData) => {
 const {
  user_useCase: { findUserById_useCase, getPreferredJobs_useCase },
 } = dependencies;
 const getPreferredJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  try {
   const token = req.cookies?.auth_jwt;
   const userId = getUserById(token, JWT_SECRET!);

   if (!token || !userId) {
    return next(ErrorResponse.forbidden("Token is Invalid"));
   }

   const userDetails = await findUserById_useCase(dependencies).execute(userId);

   if (!userDetails)
    return next(ErrorResponse.badRequest("User Id is invalid"));

   const userCredentials = {
    preferredCategory: userDetails.preferredCategory,
    skills: userDetails.skills,
   };

   const preferredJobs = await getPreferredJobs_useCase(dependencies).execute(userCredentials);

   if (!preferredJobs)
    return next(ErrorResponse.badRequest("preferred Jobs not Found"));

   res.status(200).json(preferredJobs);
  } catch (error) {
   next(error);
  }
 };
 return getPreferredJobs;
};
