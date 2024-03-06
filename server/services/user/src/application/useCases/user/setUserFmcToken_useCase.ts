
import { ObjectId } from "mongoose";
import { IDependenciesData } from "../../interfaces/IDependenciesData";

export const setUserFmcToken_useCase = (
 dependencies: IDependenciesData
) => {
 const {
  userRepo: { setUserFmcToken },
 } = dependencies;
 const execute = async (userId: ObjectId, fmcToken: string) => {
  try {
   return await setUserFmcToken(userId, fmcToken);
  } catch (error) {
   console.log("<<Something went wrong in setUserPreferredCategory_useCase>>");
   return false;
  }
 };
 return {
  execute,
 };
};
