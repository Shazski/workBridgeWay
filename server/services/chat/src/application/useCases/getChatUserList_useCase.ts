import { ObjectId } from "mongoose";
import { IDependencies } from "../interfaces/IDependencies";

export const getChatUserList_useCase = (dependencies: IDependencies) => {
 const {
  chatRepo: { getChatUserList_repo },
 } = dependencies;
 const execute = async (roomCreater: ObjectId) => {
  try {
   const result = await getChatUserList_repo(roomCreater)
    
   if (!result) return false;
   return result;
  } catch (error) {
   console.log(error, "<< Something went wrong in getChatUserList_useCase >>");
   return false;
  }
 };
 return { execute };
};
