import { IDependenciesData } from "../../interfaces/IDependenciesData";
import { IUpdateUser } from "../../interfaces/interfaces";

export const findUserByEmail_useCase = (dependencies: IDependenciesData) => {
  const {
    userRepo: { findUserByEmail_repo },
  } = dependencies;
  const execute = async (userCredentails: IUpdateUser) => {
    try {
     return await findUserByEmail_repo(userCredentails);
    } catch (error) {
        console.log(error, "<< Something went wrong in findUserByEmail usecase >>");
      return false;
    }
  };
  return {
    execute,
  };
};
