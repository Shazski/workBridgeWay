import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { IJobs } from "../../../../domain/entities/job.entity";
import { boolean } from "joi";

const JobsSchema: Schema = new Schema(
  {
    applicants: [
      {
        applicantId: { type: Schema.Types.ObjectId },
        appliedDate: { type: Date },
        description: { type: String },
        email: { type: String },
        hiringStage: { type: String },
        linkedIn: { type: String },
        name: { type: String },
        number: { type: Number },
        portfolio: { type: String },
        prevJob: { type: String },
        resume: { type: String },
        schedule: {
          date: { type: Date },
          employeeId: { type: Schema.Types.ObjectId },
          time: { type: String },
        },
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
    companyId: { type: Schema.Types.ObjectId },
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
