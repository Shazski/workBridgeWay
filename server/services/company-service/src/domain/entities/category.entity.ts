import { Document, ObjectId } from 'mongoose';

export interface ICategory extends Document {
  Category: String | null;
  Description: String | null;
  _id: ObjectId;
}


