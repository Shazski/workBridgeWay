import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../../../../domain/entities/user.entity";

const UsersSchema: Schema = new Schema(
 {
  email: { type: String, required: true, unique: true },
  profilePic: { type: String },
  resume: { type: String },
  password: { type: String, required: true },
  role: {
   type: String,
   required: true,
   enum: ["user", "company", "employee", "admin"],
   default: "user",
  },
  skills: [{ type: String }],
  socialLinks: [
   {
    link: { type: String },
    socialMedia: { type: String },
   },
  ],
  dob: { type: String },
  status: { type: Boolean, default: true },
  preferredCategory: { type: String },
  profileScore: { type: Number, default: 0 },
  userName: { type: String, required: true },
  chatStatus: { type: String, enum: ["online", "offline"] },
  jobStatus: { type: String },
  about: { type: String },
  languages: [{ type: String }],
  phone: { type: Number, unique: true, sparse: true },
  education: { type: String },
 },
 {
  timestamps: true,
 }
);

UsersSchema.pre("save", function (next) {
 const user = this;

 if (!user.isModified("password") || !user.password) return next();

 bcrypt.hash(user?.password as string, 10, (err: any, hash: string) => {
  if (err) return next(err);

  user.password = hash;
  next();
 });
});

const Users = mongoose.model<IUser>("Users", UsersSchema);

export interface IUserData extends IUser {
 createdAt: Date;
 updatedAt: Date;
}

export default Users;
