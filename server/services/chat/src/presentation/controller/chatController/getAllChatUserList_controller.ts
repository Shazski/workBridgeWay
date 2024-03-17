import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { ErrorResponse } from "work-bridge-way-common";

export default (dependencies: IDependencies) => {
 console.log("🚀 ~ dependencies:", dependencies)
 const {
  chatUseCase: { getChatUserList_useCase },
 } = dependencies;
 const getAllChatUserList = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  const roomCreater = req.query.roomCreater;
  try {
   const chatUserList = await getChatUserList_useCase(dependencies).execute(
    roomCreater
   );

   if (!chatUserList)
    return next(ErrorResponse.notFound("No User Found"));

   return res.status(201).json(chatUserList);
  } catch (error) {
   console.log(
    error,
    "<< Something went wrong in getAllChatUserList controller >>"
   );
   next(error);
  }
 };
 return getAllChatUserList;
};
