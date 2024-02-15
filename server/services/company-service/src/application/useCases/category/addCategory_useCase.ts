import { ObjectId } from "mongoose";
import { ICategory } from "../../../domain/entities/category.entity";
import { IDependencies } from "../../interface/IDependencies";

export const addCategory_useCase = (dependencies: IDependencies) => {
  const {
    category_repo: { addCategory },
  } = dependencies;
  const execute = async (credentials: ICategory,companyId:ObjectId) => {
    try {
      const category = await addCategory(credentials, companyId);

      if (!category) return false;

      return category;
    } catch (error) {
        console.log(error,"<< Something went wrong in add category useCase>>")
        return false
    }
  };
  return {execute};
};
