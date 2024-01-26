import { IDependenciesData } from "../../interfaces/IDependenciesData";

export const removeUserSkill_useCase = (dependencies: IDependenciesData) => {
  const {
    userRepo: { removeUserSkills_repo },
  } = dependencies;
  const execute = async (userCredentials: { email: string; skill: string }) => {
    try {
      return await removeUserSkills_repo(userCredentials);
    } catch (error) {
      console.log("<<Something went wrong in remove User skill useCase>>");
      return false
    }
  };
  return {
    execute,
  };
};
