import { IDependenciesData } from "../../interfaces/IDependenciesData";

export const addUserSkills_useCase = (dependencies: IDependenciesData) => {
  const {
    userRepo: { addUserSkills_repo },
  } = dependencies;
  const execute = async (userCredentials: { skill: string; email: string }) => {
    try {
      return await addUserSkills_repo(userCredentials)
    } catch (error) {
      console.log("<< Somthing went wrong in editUserSkills usecase >>");
      return false;
    }
  };
  return {
    execute
  }
};
