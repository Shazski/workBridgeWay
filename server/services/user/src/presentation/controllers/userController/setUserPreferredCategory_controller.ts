import { NextFunction, Request, Response } from "express";
import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";
import { ErrorResponse, getUserById } from "work-bridge-way-common";
import { JWT_SECRET } from "../../../config";

export = (dependencies: IDependenciesData) => {
 const {
  user_useCase: { setUserPreferredCategory_useCase },
 } = dependencies;
 const setUserPreferredCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  const category = req.body.category;
  const token = req.cookies?.auth_jwt;
  const userId = getUserById(token, JWT_SECRET!);
  if (!token || !userId) {
   return next(ErrorResponse.forbidden("Token is Invalid"));
  }
  try {
   const user = await setUserPreferredCategory_useCase(dependencies).execute(userId,
    category
   );

   if (!user)
    return next(ErrorResponse.badRequest("Not able to set preferred category"));

   res.status(201).json(user);
  } catch (error) {
   console.log("<<Something went wrong in setUserPreferredCategory controller>>");
   next(error);
  }
 };
 return setUserPreferredCategory;
};
