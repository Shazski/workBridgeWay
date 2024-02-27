import { ObjectId } from "mongoose";
import { IDependenciesData } from "../../interfaces/IDependenciesData";

export const addResume_useCase = (dependencies: IDependenciesData) => {
  const {
    userRepo: {uploadResume },
  } = dependencies;
  const execute = async (id:ObjectId, resume:string) => {
    try {
      return await uploadResume(id, resume)
    } catch (error) {
      console.log("<< Somthing went wrong in editUserSkills usecase >>");
      return false;
    }
  };
  return {
    execute
  }
};
