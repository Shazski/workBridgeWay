import { NextFunction, Request, Response } from "express";
import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";
import { ErrorResponse } from "work-bridge-way-common";

export = (dependencies: IDependenciesData) => {
 const {
  admin_useCase: { getAllUsers_useCase },
 } = dependencies;
 const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  const search = req.query.search || "";
  const page = req.query.page || 1;
  try {
   const usersData = await getAllUsers_useCase(dependencies).execute(
    page,
    search
   );
   if (!usersData)
    return next(ErrorResponse.notFound("No Data found on database"));

   res.status(200).json(usersData);
  } catch (error) {
   console.log(
    error,
    "<<Something went wrong in get all user details controller>>"
   );
   next(error);
  }
 };
 return getAllUsers;
};
