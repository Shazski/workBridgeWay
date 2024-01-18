import { IUser } from "../../../../../domain/entities/user.entity";
import UserSchema, { IUserData } from "../../schema/userSchema";

export const findUserByEmail_repo = async (
  userCredentials: IUser
): Promise<boolean | IUserData> => {
  try {
    const userExists = await UserSchema.findOne({$or:[{email:userCredentials.email},{phone:userCredentials.phone}]});
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
    const newUser = await UserSchema.create(userCredentials);
    if (newUser) return newUser as IUserData;
    else throw new Error("something went wrong during creating new user");
  } catch (error: any) {
    if (error?.code === 11000) return false;
    console.log(error, "<Something went wrong in signUpUser_repo>");
    return false;
  }
};
