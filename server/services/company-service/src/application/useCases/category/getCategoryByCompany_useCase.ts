import { ObjectId } from "mongoose";
import { IDependencies } from "../../interface/IDependencies";

export const getCategoryByCompany = (dependencies: IDependencies) => {
  const {
    category_repo: { getCategoryByCompany },
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
