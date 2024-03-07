import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { IJobs } from "../../../../domain/entities/job.entity";

const JobsSchema: Schema = new Schema(
 {
  applicants: [
   {
    applicantId: { type: Schema.Types.ObjectId },
    appliedDate: { type: Date, default: new Date() },
    hiringStage: { type: String },
    linkedIn: { type: String },
    name: { type: String },
    phone: { type: Number },
    portfolioURL: { type: String },
    previousJob: { type: String },
    resume: { type: String },
    schedule: [{
     testType: { type: String },
     date: { type: String },
     employeeId: { type: Schema.Types.ObjectId },
     time: { type: String },
    }],
   },
  ],
  category: { type: String },
  expiry: { type: Date },
  status: { type: Boolean, default: true },
  fromSalary: { type: Number },
  jobDescription: { type: String },
  jobTitle: { type: String },
  requiredSkills: [{ type: String }],
  responsibilities: [{ type: String }],
  toSalary: { type: Number },
  vacancy: { type: Number },
  typeOfEmployment: {
   type: String,
   enum: ["Full-Time", "Part-Time", "Remote", "Internship"],
  },
  companyId: { type: Schema.Types.ObjectId, ref: "Company" },
 },
 {
  timestamps: true,
 }
);

export interface IJobsData extends IJobs {
 _id: ObjectId;
 createdAt: Date;
 upadtedAt: Date;
}

const Jobs = mongoose.model<IJobs>("Jobs", JobsSchema);

export default Jobs;
