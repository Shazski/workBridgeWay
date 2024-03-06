import { NextFunction, Request, Response } from "express";
import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";
import { ErrorResponse, getUserById } from "work-bridge-way-common";
import { JWT_SECRET } from "../../../config";

export = (dependencies: IDependenciesData) => {
 const {
  user_useCase: { setUserFmcToken_useCase },
 } = dependencies;
 const setUserFmcToken = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  const fmcToken = req.body.fmcToken;
  const token = req.cookies?.auth_jwt;
  const userId = getUserById(token, JWT_SECRET!);
  if (!token || !userId) {
   return next(ErrorResponse.forbidden("Token is Invalid"));
  }

  try {
   const user = await setUserFmcToken_useCase(dependencies).execute(userId,
    fmcToken
   );

   if (!user)
    return next(ErrorResponse.badRequest("Not able to set Fcm Token"));

   res.status(201).json(user);
  } catch (error) {
   console.log("<<Something went wrong in setUserFmcToken controller>>");
   next(error);
  }
 };
 return setUserFmcToken;
};
