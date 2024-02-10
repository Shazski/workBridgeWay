import mongoose, { Schema, ObjectId } from "mongoose";
import { ICategory } from "./../../../../domain/entities/category.entity";

const CategorySchema: Schema = new Schema(
  {
    companyId: { type: Schema.Types.ObjectId },
    category: [{ description: String, category: String }],
  },
  {
    timestamps: true,
  }
);

export interface ICategoryData extends ICategory {
  createdAt: Date;
  updatedAt: Date;
}

const Category = mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
