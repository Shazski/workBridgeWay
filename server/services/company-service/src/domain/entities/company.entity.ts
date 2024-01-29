import { Document, ObjectId } from "mongoose";

export interface ICompany extends Document {
  _id: ObjectId;
  Email: String | null;
  CompanyLogo: String | null;
  Name: String | null;
  LinkedIn: String | null;
  Locations: String[] | null;
  HeadOffice: String | null;
  Founded: String | null;
  WebsiteLink: String | null;
  Password: String | null;
  Description: String | null;
  TechStack: String[] | null;
}
