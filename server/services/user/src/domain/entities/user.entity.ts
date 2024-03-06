import { Document, ObjectId } from "mongoose";

export interface IUser extends Document {
 _id?: ObjectId;
 name?: string;
 email?: string;
 password?: string;
 role?: string;
 phone?: number | null;
 profilePic?: string | null;
 resume?: string | null;
 status?: boolean;
 skills?: string[] | null;
 socialLinks?: {
  link?: string | null;
  socialMedia?: string | null;
 }[];
 newEmail?: string | null;
 profileScore?: number | null;
 dob?: string | null;
 chatStatus?: string | null;
 jobStatus?: string | null;
 about?: string | null;
 languages?: string[] | null;
 preferredCategory?:string | null
 education?: string | null;
 oldEmail?: string | null;
 createdAt?: Date;
 updatedAt?: Date;
}
