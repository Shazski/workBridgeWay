import { Document, ObjectId } from "mongoose";

export interface ICategory extends Document {
  category: String | null;
  description: String | null;
}
