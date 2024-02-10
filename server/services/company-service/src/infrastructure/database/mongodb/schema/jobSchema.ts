import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { IJobs } from "../../../../domain/entities/job.entity";

const JobsSchema: Schema = new Schema(
  {
    applicants: [
      {
        applicantId: { type: Schema.Types.ObjectId },
        appliedDate: { type: Date },
        aescription: { type: String },
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
    category: [{ type: String }],
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
