import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { ErrorResponse } from "work-bridge-way-common";

export default (dependencies: IDependencies) => {
 const {
  chatUseCase: { getChatCompanyList_useCase },
 } = dependencies;
 const getAllChatCompanyList = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  const roomJoiner = req.query.roomJoiner;
  try {
   const chatCompanyList = await getChatCompanyList_useCase(dependencies).execute(
    roomJoiner
   );

   console.log(chatCompanyList,"chatCompanyList");
   

   if (!chatCompanyList)
    return next(ErrorResponse.notFound("No User Found"));

   return res.status(201).json(chatCompanyList);
  } catch (error) {
   console.log(
    error,
    "<< Something went wrong in getAllChatCompanyList controller >>"
   );
   next(error);
  }
 };
 return getAllChatCompanyList;
};
