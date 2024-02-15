import mongoose, { Schema, ObjectId } from "mongoose";
import { ICategory } from "./../../../../domain/entities/category.entity";

const CategorySchema: Schema = new Schema(
  {
    companyId: { type: Schema.Types.ObjectId, required: true },
    category: { type: String },
    description: { type: String },
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
