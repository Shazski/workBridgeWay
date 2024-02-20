import { ObjectId } from "mongoose";
import { IDependenciesData } from "../../interfaces/IDependenciesData"; 

export const getCategoryByCompany = (dependencies: IDependenciesData) => {
  const {
    categoryRepo: { getCategoryByCompany },
  } = dependencies;
  const execute = async (companyId: ObjectId) => {
    try {
      return await getCategoryByCompany(companyId);
    } catch (error) {
      console.log(
        error,
        "<< Something went wrong in getCategroy by company useCase >>"
      );
      return false;
    }
  };

  return { execute };
};
