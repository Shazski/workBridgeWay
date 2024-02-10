import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { ICategory } from "./../../../../domain/entities/category.entity";

const CategorySchema: Schema = new Schema(
  {
    Category: { type: String },
    Description: { type: String },
  },
  {
    timestamps: true,
  }
);

export interface ICategoryData extends ICategory {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const Category = mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
