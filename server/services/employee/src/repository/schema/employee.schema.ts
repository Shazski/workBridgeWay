import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class Employee extends Document {
  @Prop({ type: String, required: true })
  employeeName: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;
  
  @Prop({ type: String, required: true})
  password: string;

  @Prop({ type: String, required: true })
  companyId: string;

  @Prop({ type: String, required: true })
  role: string;

  @Prop({ type: String, required: true })
  department: string;

  @Prop({
    schedule: [
      {
        applicantid: { type: SchemaTypes.ObjectId },
        date: { type: Date },
        time: { type: String },
      },
    ],
  })
  schedule: Array<{
    applicantid: string;
    date: Date;
    time: string;
  }>;

  @Prop({
    attendance: [
      {
        checkin: { type: String },
        checkout: { type: String },
        date: { type: Date },
        status: { type: String },
      },
    ],
  })
  attendance: Array<{
    checkin: string;
    checkout: string;
    date: Date;
    status: string;
  }>;

  @Prop({
    leavedata: [
      {
        takenleaves: { type: Number },
        totalleaves: { type: Number },
      },
    ],
  })
  leavedata: Array<{
    takenleaves: number;
    totalleaves: number;
  }>;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
