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

