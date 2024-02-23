import { NextFunction, Request, Response } from "express";
import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";
import { ErrorResponse } from "work-bridge-way-common";

export = (dependencies: IDependenciesData) => {
 const {
  user_useCase: { editUser_useCase },
 } = dependencies;
 const editUser = async (req: Request, res: Response, next: NextFunction) => {
  //find user and edit user details with body data..
  const userCredentials = req.body;
  try {
   //Update user according to the data updated by user..
   const updatedUser = await editUser_useCase(dependencies).execute(
    userCredentials
   );

   if (!updatedUser)
    return next(ErrorResponse.conflict("Phone number is already taken"));
   const user = updatedUser;
   res.status(201).json(user);
  } catch (error) {
   next(error);
  }
 };
 return editUser;
};
