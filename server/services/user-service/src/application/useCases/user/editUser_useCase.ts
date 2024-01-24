import { IUser } from "../../../domain/entities/user.entity";
import { IDependenciesData } from "../../interfaces/IDependenciesData";

export const editUser_useCase = (dependencies: IDependenciesData) => {
  const {
    userRepo: { editUser_repo },
  } = dependencies;
  const execute = async (userCredentials: IUser) => {
    try {
      return await editUser_repo(userCredentials);
    } catch (error) {
      console.log(error, "<< Something went wrong in edit user usecase >>");
      return false;
    }
  };
  return {
    execute,
  };
};
