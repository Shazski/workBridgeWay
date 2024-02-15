import { Document, ObjectId } from "mongoose";

export interface IJobs extends Document {
  _id: ObjectId;
  applicants: {
    applicantId: ObjectId | null;
    appliedDate: Date | null;
    description: String | null;
    email: String | null;
    hiringStage: String | null;
    linkedIn: String | null;
    name: String | null;
    number: Number | null;
    portfolio: String | null;
    prevJob: String | null;
    resume: String | null;
    schedule: {
      date: Date | null;
      employeeId: ObjectId | null;
      time: String | null;
    };
  }[];
  category: String | null;
  expiry: Date | null;
  status: String | null;
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
