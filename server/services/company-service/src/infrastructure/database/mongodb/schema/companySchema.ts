import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { ICompany } from "../../../../domain/entities/company.entity";

const CompanySchema: Schema = new Schema(
  {
    email: { type: String },
    companyLogo: { type: String },
    name: { type: String },
    linkedIn: { type: String },
    locations: { type: String },
    headOffice: { type: String },
    founded: { type: String },
    websiteLink: { type: String },
    password: { type: String },
    description: { type: String },
    techStack: { type: String },
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model<ICompany>("Company", CompanySchema);

export interface ICompanyData extends ICompany {
  createdAt: Date;
  updatedAt: Date;
}

export default Company;
