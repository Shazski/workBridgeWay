import { ObjectId } from "mongoose";
import { ICategory } from "../../../../../domain/entities/category.entity";
import CategorySchema, { ICategoryData } from "../../schema/categorySchema";

export const addCategory = async (
  credentials: ICategory,
  companyId: ObjectId
): Promise<ICategoryData | boolean> => {
  try {
    const category = await CategorySchema.create({
      ...credentials,
      companyId,
    });
    if (!category) return false;

    const categoryData = category as ICategoryData;

    return categoryData;
  } catch (error) {
    console.log(error, " << Something went wrong in add  category repo >> ");
    return false;
  }
};

export const getCategoryByCompany = async (
  companyId: ObjectId
): Promise<string[] | boolean> => {
  try {
    const category: (String | null)[] = await CategorySchema.distinct(
      "category",
      {
        companyId: companyId,
      }
    );
    console.log(category, "category data");
    if (!category) return false;

    return category as string[];
  } catch (error) {
    console.log(error, "<< Something went wrong in  getcategory repo >>");
    return false;
  }
};
