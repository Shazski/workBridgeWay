import { Document, ObjectId } from "mongoose";

export interface ICompany extends Document {
  _id: ObjectId;
  email: String | null;
  companyLogo: String | null;
  name: String | null;
  linkedIn: String | null;
  locations: String[] | null;
  headOffice: String | null;
  founded: String | null;
  websiteLink: String | null;
  password: String | null;
  description: String | null;
  techStack: String[] | null;
  stage: string | null
}
