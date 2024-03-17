import { IChatroom } from "../../domain/entity";
import { IDependencies } from "../interfaces/IDependencies";

export const createChatRoom_useCase = (dependencies: IDependencies) => {
 const {
  chatRepo: { createChatRoom_repo },
 } = dependencies;
 const execute = async (chatCredentials: IChatroom) => {
  try {
   const result = await createChatRoom_repo(chatCredentials)
    
   if (!result) return false;
   return result;
  } catch (error) {
   console.log(error, "<< Something went wrong in createChatRoom useCase >>");
   return false;
  }
 };
 return { execute };
};
