import { ObjectId } from "mongoose";

export interface IJob {
  _id:ObjectId | null;
  category: String[] | null;
  fromSalary: Number | null;
  jobDescription: String | null;
  jobTitle: String | null;
  requiredSkills: String[] | null;
  responsibilities: String[] | null;
  toSalary: Number | null;
  typeOfEmployment: String | null;
  vacancy: Number | null;
  companyId: ObjectId | null;
}
