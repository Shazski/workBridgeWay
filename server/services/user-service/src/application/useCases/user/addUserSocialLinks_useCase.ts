import { IDependenciesData } from "../../interfaces/IDependenciesData";

export const addUserSocialLinks_useCase = (dependencies: IDependenciesData) => {
  const {
    userRepo: { addUserSocialLinks_repo },
  } = dependencies;
  const execute = async (userCredentials: {
    email: string;
    socialLinks: { socialMedia: string; link: string };
  }) => {
    try {
      return await addUserSocialLinks_repo(userCredentials);
    } catch (error) {
      console.log("<< Something went wrong in addUserSocialLinks useCase>>");
      return false;
    }
  };
  return { execute };
};
