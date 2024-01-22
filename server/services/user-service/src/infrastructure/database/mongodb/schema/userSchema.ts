import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../../../../domain/entities/user.entity";

const UsersSchema: Schema = new Schema(
  {
    email: { type: String, required: true,unique:true },
    profilePic: { type: String },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["user"], default:"user" },
    skills: [{ type: String }],
    socialLinks: [
      {
        link: { type: String },
        socialMedia: { type: String },
      },
    ],
    dob: { type: String },
    userName: { type: String, required: true },
    chatStatus: { type: String, enum: ["online", "offline"] },
    jobStatus: { type: String },
    about: { type: String },
    languages: [{ type: String }],
    phone: { type: Number, unique:true },
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

//prevent password sending to frontend
UsersSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.__v;
    return userObject;
  };

const Users = mongoose.model<IUser>("Users", UsersSchema);

export interface IUserData extends IUser {
  createdAt: Date;
  updatedAt: Date;
}

export default Users;
