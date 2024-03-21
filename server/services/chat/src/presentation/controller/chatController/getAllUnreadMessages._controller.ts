import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { ErrorResponse } from "work-bridge-way-common";

export default (dependencies: IDependencies) => {
 const {
  chatUseCase: { getAllUnreadMessages_useCase },
 } = dependencies;
 const getAllUnreadMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  try {
   const unreadMessages = await getAllUnreadMessages_useCase(
    dependencies
   ).execute();

   if (!unreadMessages) return next(ErrorResponse.notFound("No Chat Found"));

   return res.status(201).json(unreadMessages);
  } catch (error) {
   console.log(
    error,
    "<< Something went wrong in getAllUnreadMessages controller >>"
   );
   next(error);
  }
 };
 return getAllUnreadMessages;
};
