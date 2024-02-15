import { Document, ObjectId } from "mongoose";

export interface ICategory extends Document {
  companyId: ObjectId | null;
  category: String | null;
  description: String | null;
}
