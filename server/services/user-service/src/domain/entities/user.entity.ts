import {Document, ObjectId } from "mongoose";

export interface IUser extends Document {
    _id: ObjectId;
    name: string;
    email: string;
    password: string;
    role: string;
    phone: number | null;
    profilePic?: string | null;
    status?: boolean;
    skills?: string[] | null;
    socialLinks?: {
      link?: string | null;
      socialMedia?: string | null;
    }[];
    dob?: string | null;
    chatStatus?: string | null;
    jobStatus?: string | null;
    about?: string | null;
    languages?: string[] | null;
    education?: string | null;
  }