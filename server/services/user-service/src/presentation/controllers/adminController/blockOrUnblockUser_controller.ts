import { NextFunction, Request, Response } from "express";
import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";
import { ObjectId } from "mongoose";
import { ErrorResponse } from "work-bridge-way-common";

export default (dependencies: IDependenciesData) => {
 const {
  admin_useCase: { blockOrUnblockUser_useCase },
 } = dependencies;
 const blockOrUnblockUser = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  const { id, status }: { id: ObjectId; status: boolean } = req.body;
  console.log(req.body, "body Data")
  console.log(id,"id data")
  console.log(status,"status data")
  try {
   const userUpdated = await blockOrUnblockUser_useCase(dependencies).execute(
    id,
    status
   );

   if (!userUpdated)
    return next(ErrorResponse.badRequest("User Id is not valid"));

   return res
    .status(200)
    .json({ success: true, message: "user updated successfully" });
  } catch (error) {
   console.log(
    error,
    "<< Something went wrong in block or unblock user controller >>"
   );
   next(error);
  }
 };
 return blockOrUnblockUser;
};
