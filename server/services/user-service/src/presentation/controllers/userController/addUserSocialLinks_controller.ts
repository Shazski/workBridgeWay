import { NextFunction, Request, Response } from "express";
import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";
import { ErrorResponse } from "work-bridge-way-common";

export = (dependencies: IDependenciesData) => {
 const {
  user_useCase: { addUserSocialLinks_useCase },
 } = dependencies;

 const addUserSocialLinks = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  const userCredentials = req.body;
  try {
   const user = await addUserSocialLinks_useCase(dependencies).execute(
    userCredentials
   );

   if (!user)
    return next(ErrorResponse.internalError("Not able to add social links"));

   res.status(201).json(user);
  } catch (error) {
   console.log("<< Somthing went wrong inadd user social links controller >>");
   next(error);
  }
 };
 return addUserSocialLinks;
};
