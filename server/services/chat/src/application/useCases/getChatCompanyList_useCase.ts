import { ObjectId } from "mongoose";
import { IDependencies } from "../interfaces/IDependencies";

export const getChatCompanyList_useCase = (dependencies: IDependencies) => {
 const {
  chatRepo: { getChatCompanyList_repo },
 } = dependencies;
 const execute = async (roomJoiner: ObjectId) => {
  try {
   const result = await getChatCompanyList_repo(roomJoiner)
    
   if (!result) return false;
   return result;
  } catch (error) {
   console.log(error, "<< Something went wrong in getChatCompanyList_useCase >>");
   return false;
  }
 };
 return { execute };
};
