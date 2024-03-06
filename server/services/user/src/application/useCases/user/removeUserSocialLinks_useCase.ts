import { IDependenciesData } from "../../interfaces/IDependenciesData";

export const removeUserSocialLinks_useCase = (dependencies: IDependenciesData) => {
  const {
    userRepo: { removeUserSocialLinks_repo },
  } = dependencies;
  const execute = async (userCredentials: { skill: string; email: string }) => {
    try {
      return await removeUserSocialLinks_repo(userCredentials)
    } catch (error) {
      console.log("<< Somthing went wrong in editUserSkills usecase >>");
      return false;
    }
  };
  return {
    execute
  }
};
