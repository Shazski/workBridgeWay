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
        $or: [
          { email: userCredentials.email },
          { phone: userCredentials.phone },
        ],
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
  try {
    if (userCredentials.password) {
      const hashedPassword = await bcrypt.hash(userCredentials.password, 10);
      userCredentials.password = hashedPassword;
    }
    const updatedUser = await UserSchema.findOneAndUpdate(
      { email: userCredentials.email },
      {
        $set: { ...userCredentials },
      },
      { new: true }
    );
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
