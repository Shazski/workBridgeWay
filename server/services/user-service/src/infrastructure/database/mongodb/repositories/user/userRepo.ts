import { ObjectId } from "mongoose";
import { IUser } from "../../../../../domain/entities/user.entity";
import UserSchema, { IUserData } from "../../schema/userSchema";
import bcrypt from "bcrypt";

export const findUserByEmail_repo = async (
 userCredentials: IUser
): Promise<boolean | IUserData> => {
 try {
  let userExists;
  if (userCredentials.phone) {
   userExists = await UserSchema.findOne({
    $or: [{ email: userCredentials.email }, { phone: userCredentials.phone }],
   });
  } else {
   userExists = await UserSchema.findOne({ email: userCredentials.email });
  }
  if (!userExists) return false;
  return userExists as IUserData;
 } catch (error) {
  console.log(error, "< Something went wrong on FindUserByEmail_repo >");
  return false;
 }
};

export const SignUpUser_repo = async (
 userCredentials: IUser
): Promise<IUserData | boolean> => {
 try {
  const newUser = await UserSchema.create({ ...userCredentials });
  if (newUser) return newUser as IUserData;
  else throw new Error("something went wrong during creating new user");
 } catch (error: any) {
  if (error?.code === 11000) {
   console.log("unique code error", error);
   return false;
  }
  console.log(error, "<Something went wrong in signUpUser_repo>");
  return false;
 }
};

export const editUser_repo = async (
 userCredentials: IUser
): Promise<IUser | boolean> => {
 let updatedUser: IUser | null;
 try {
  if (userCredentials.password) {
   const hashedPassword = await bcrypt.hash(userCredentials.password, 10);
   userCredentials.password = hashedPassword;
  }
  if (userCredentials.oldEmail) {
   updatedUser = await UserSchema.findOneAndUpdate(
    { email: userCredentials.oldEmail },
    {
     $set: { email: userCredentials.email },
    },
    { new: true }
   );
  } else {
   updatedUser = await UserSchema.findOneAndUpdate(
    { email: userCredentials.email },
    {
     $set: { ...userCredentials },
    },
    { new: true }
   );
  }
  if (!updatedUser) return false;

  return updatedUser;
 } catch (error: any) {
  if (error?.code === 11000) {
   return false;
  }
  console.error("Error", error);
  return false;
 }
};

export const addUserSkills_repo = async (userCredentials: {
 skill: string;
 email: string;
}): Promise<IUser | boolean> => {
 try {
  const updatedUser = await UserSchema.findOneAndUpdate(
   { email: userCredentials.email },
   {
    $addToSet: {
     skills: userCredentials.skill,
    },
   },
   { new: true }
  );
  if (!updatedUser) return false;

  return updatedUser;
 } catch (error) {
  console.log("<Something went wrong in add skill repo>");
  return false;
 }
};
export const removeUserSkills_repo = async (userCredentials: {
 skill: string;
 email: string;
}): Promise<IUser | boolean> => {
 try {
  const updatedUser = await UserSchema.findOneAndUpdate(
   { email: userCredentials.email },
   {
    $pull: {
     skills: userCredentials.skill,
    },
   },
   { new: true }
  );
  if (!updatedUser) return false;

  return updatedUser;
 } catch (error) {
  console.log("<Something went wrong in remove user skill repo>");
  return false;
 }
};
export const updateUserAbout_repo = async (userCredentials: {
 about: string;
 email: string;
}): Promise<IUser | boolean> => {
 try {
  const updatedUser = await UserSchema.findOneAndUpdate(
   { email: userCredentials.email },
   {
    $set: {
     about: userCredentials.about,
    },
   },
   { new: true }
  );
  if (!updatedUser) return false;

  return updatedUser;
 } catch (error) {
  console.log("<Something went wrong in updateUserAbout repo>");
  return false;
 }
};
export const addUserSocialLinks_repo = async (userCredentials: {
 email: string;
 socialLinks: {
  socialMedia: string;
  link: string;
 };
}): Promise<IUser | boolean> => {
 try {
  const updatedUser = await UserSchema.findOneAndUpdate(
   { email: userCredentials.email },
   {
    $push: {
     socialLinks: userCredentials.socialLinks,
    },
   },
   { new: true }
  );
  if (!updatedUser) return false;

  return updatedUser;
 } catch (error) {
  console.log("<Something went wrong in add social link repo>");
  return false;
 }
};
export const removeUserSocialLinks_repo = async (userCredentials: {
 socialLinks: {
  socialMedia: string;
  link: string;
 };
 email: string;
}): Promise<IUser | boolean> => {
 try {
  const updatedUser = await UserSchema.findOneAndUpdate(
   { email: userCredentials.email },
   {
    $pull: {
     socialLinks: userCredentials.socialLinks,
    },
   },
   { new: true }
  );
  if (!updatedUser) return false;

  return updatedUser;
 } catch (error) {
  console.log("<Something went wrong in remove user socialLinks repo>");
  return false;
 }
};

export const getAllUsers = async (
 page: number,
 search: string
): Promise<any> => {
 const skip = (page - 1) * 10;
 try {
  const users: any = await UserSchema.find({
   $or: [
    {
     email: { $regex: `${search}`, $options: "i" },
    },
    {
     userName: { $regex: `${search}`, $options: "i" },
    },
   ],
   role: "user",
  })
   .limit(10)
   .skip(skip);
  const count: number = await UserSchema.find({
   $or: [
    {
     email: { $regex: `${search}`, $options: "i" },
    },
    {
     userName: { $regex: `${search}`, $options: "i" },
    },
   ],
   role: "user",
  }).countDocuments();
  if (!users) return false;
  return [users, count] as any;
 } catch (error) {
  console.log(error, "< Something went wrong on get all users repo >");
  return false;
 }
};

export const blockOrUnblockUser = async (
 id: ObjectId,
 status: boolean
): Promise<boolean> => {
 try {
  const updatedUser = await UserSchema.findByIdAndUpdate(
   id,
   {
    status: status,
   },
   { new: true }
  );
  if (!updatedUser) {
   return false;
  }
  return true;
 } catch (error) {
  console.log(
   error,
   " << Something went wrong in blockorunblock user repo >> "
  );
  return false;
 }
};
export const uploadResume = async (
 id: ObjectId,
 resume: string
): Promise<any> => {
 try {
  const updatedUser = await UserSchema.findByIdAndUpdate(
   id,
   {
    resume: resume,
   },
   { new: true }
  );
  if (!updatedUser) {
   return false;
  }
  return updatedUser;
 } catch (error) {
  console.log(
   error,
   " << Something went wrong in update resume user repo >> "
  );
  return false;
 }
};
