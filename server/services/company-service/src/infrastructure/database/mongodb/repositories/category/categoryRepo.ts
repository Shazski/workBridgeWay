import { ICategory } from "../../../../../domain/entities/category.entity";
import CategorySchema, { ICategoryData } from "../../schema/categorySchema";

export const addCategory = async (credentials:ICategory): Promise< ICategoryData | boolean > => {
    try {
        const category = await CategorySchema.create({
            ...credentials
        })
        if(!category) return false

        const categoryData = category as ICategoryData

        return categoryData

    } catch (error) {
        console.log(error, " << Something went wrong in add  category repo >> ")
        return false
    }
}