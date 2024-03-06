import { ObjectId } from "mongoose";
import { ICategory } from "../../../../../domain/entities/category.entity";
import CategorySchema, { ICategoryData } from "../../schema/categorySchema";

export const addCategory = async (
  credentials: ICategory
): Promise<ICategoryData | boolean> => {
  try {
    const category = await CategorySchema.create({
      ...credentials,
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
    const categories = await CategorySchema.find().select('category');

    const categoryStrings = categories
      .filter((category) => category !== null)
      .map((category) => category?.category as string);

    console.log(categoryStrings, "category data");
    if (!categoryStrings) return false;

    return categoryStrings;
  } catch (error) {
    console.log(error, "<< Something went wrong in getcategory repo >>");
    return false;
  }
};
