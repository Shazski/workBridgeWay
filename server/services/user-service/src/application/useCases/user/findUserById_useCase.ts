import { ObjectId } from "mongoose";
import { IDependenciesData } from "../../interfaces/IDependenciesData";

export const findUserById_useCase = (dependencies: IDependenciesData) => {
 const {
  userRepo: { findUserById_repo },
 } = dependencies;
 const execute = async (userId: ObjectId) => {
  try {
   return await findUserById_repo(userId);
  } catch (error) {
   console.log(error, "<< Something went wrong in findUserById_useCase  >>");
   return false;
  }
 };
 return {
  execute,
 };
};
