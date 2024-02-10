import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IJobs extends Document {
  _id: ObjectId;
  job: {
     applicants: {
        ApplicantId: ObjectId | null;
        AppliedDate: Date | null;
        Description: String | null;
        Email: String | null;
        HiringStage: String | null;
        LinkedIn: String | null;
        Name: String | null;
        Number: Number | null;
        Portfolio: String | null;
        PrevJob: String | null;
        Resume: String | null;
        schedule: {
           Date: Date | null;
           EmployeeId: ObjectId | null;
           Time: String | null;
  };
  }[];
     Category: String[] | null;
     FromSalary: Number | null;
     JobDescription: String | null;
     JobTitle: String | null;
     RequiredSkills: String[] | null;
     Responsibilities: String[] | null;
     ToSalary: Number | null;
     TypeOfEmployment: String | null;
     Vacancy: Number | null;
  }[];
  CompanyId: ObjectId | null;
}

const JobsSchema: Schema = new Schema({
  Job: [{
     Applicants: [{
        ApplicantId: { type: Schema.Types.ObjectId },
        AppliedDate: { type: Date },
        Description: { type: String },
        Email: { type: String },
        HiringStage: { type: String },
        LinkedIn: { type: String },
        Name: { type: String },
        Number: { type: Number },
        Portfolio: { type: String },
        PrevJob: { type: String },
        Resume: { type: String },
        Schedule: {
           Date: { type: Date },
           EmployeeId: { type: Schema.Types.ObjectId },
           Time: { type: String },
  },
  }],
     Category: [{ type: String,  }],
     FromSalary: { type: Number },
     JobDescription: { type: String },
     JobTitle: { type: String },
     RequiredSkills: [{ type: String,  }],
     Responsibilities: [{ type: String,  }],
     ToSalary: { type: Number },
     TypeOfEmployment: { type: String, enum: [ 'Full-Time', 'Part-Time', 'Remote', 'Internship' ] },
     Vacancy: { type: Number },
  }],
  CompanyId: { type: Schema.Types.ObjectId },
});

const Jobs = mongoose.model<IJobs>('Jobs', JobsSchema);

export default Jobs;

