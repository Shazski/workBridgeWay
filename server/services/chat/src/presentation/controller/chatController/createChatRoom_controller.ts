import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { ErrorResponse } from "work-bridge-way-common";

export default (dependencies: IDependencies) => {
 console.log("🚀 ~ dependencies:", dependencies)
 const {
  chatUseCase: { createChatRoom_useCase },
 } = dependencies;
 const createChatRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  const chatCredentials = req.body;
  try {
   const chatRoomData = await createChatRoom_useCase(dependencies).execute(
    chatCredentials
   );

   if (!chatRoomData)
    return next(ErrorResponse.conflict("Room already exists"));

   return res.status(201).json(chatRoomData);
  } catch (error) {
   console.log(
    error,
    "<< Something went wrong in createChatRoom controller >>"
   );
   next(error);
  }
 };
 return createChatRoom;
};
