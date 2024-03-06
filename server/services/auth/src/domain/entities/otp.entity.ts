import { ObjectId } from "mongoose";

export interface IOtp extends Document {
    _id: ObjectId;
    email: String;
    otp: Number;
    createdOn: Date;
  }