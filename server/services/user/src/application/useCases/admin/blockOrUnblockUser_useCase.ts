import { ObjectId } from "mongoose";
import { IDependenciesData } from "../../interfaces/IDependenciesData";

export const blockOrUnblockUser_useCase = (dependencies: IDependenciesData) => {
 const {
  userRepo: { blockOrUnblockUser },
 } = dependencies;
 const execute = async (id: ObjectId, status: boolean) => {
  try {
   return await blockOrUnblockUser(id, status);
  } catch (error) {
   console.log(
    error,
    "<< Something went wrong in blockorunblock user useCase >>"
   );
  }
 };
 return { execute };
};
