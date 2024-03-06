import { ObjectId } from "mongoose";
import { IDependenciesData } from "../../interfaces/IDependenciesData";

export const setUserPreferredCategory_useCase = (
 dependencies: IDependenciesData
) => {
 const {
  userRepo: { setUserPreferredCategory },
 } = dependencies;
 const execute = async (userId: ObjectId, category: string) => {
  try {
   return await setUserPreferredCategory(userId, category);
  } catch (error) {
   console.log("<<Something went wrong in setUserPreferredCategory_useCase>>");
   return false;
  }
 };
 return {
  execute,
 };
};
