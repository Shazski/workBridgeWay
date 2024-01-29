import mongoose, { Schema } from "mongoose";
import { ICompany } from "../../../../domain/entities/company.entity";
import bcrypt from "bcrypt";

const CompanySchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    companyLogo: { type: String, required: true },
    name: { type: String, required: true },
    linkedIn: { type: String, required: true, unique: true },
    approved: { type: Boolean, default: false },
    phone: { type: Number },
    locations: { type: String },
    headOffice: { type: String },
    founded: { type: String },
    websiteLink: { type: String },
    password: { type: String, required: true },
    description: { type: String },
    techStack: [{ type: String, default: [] }],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret._v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

CompanySchema.pre("save", function (next) {
  const company = this;

  if (!company.isModified("password") || !company.password) return next();

  bcrypt.hash(company?.password as string, 10, (err: any, hash: string) => {
    if (err) return next(err);

    company.password = hash;
    next();
  });
});

const Company = mongoose.model<ICompany>("Company", CompanySchema);

export interface ICompanyData extends ICompany {
  createdAt?: Date;
  updatedAt?: Date;
}

export default Company;
