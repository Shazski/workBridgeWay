import { NextFunction, Request, Response } from "express";
import { DependenciesData } from "../../../application/interfaces/IDependencies";
import { generateToken } from "work-bridge-way-common";
import { cookieConfig } from "../../../utils/constants/constant";
import sentGoogleAuthPasswordMail from "../../../utils/externalServices/nodemailer/sentGoogleAuthPassword";
import { JWT_SECRET } from "../../../config";

export = (dependencies: DependenciesData) => {
 const {
  user_useCase: { findUserByEmail_useCase, signUpUser_useCase },
 } = dependencies;

 const googleAuth = async (req: Request, res: Response, next: NextFunction) => {
  const userCredentials = req.body;
  try {
   const userExists = await findUserByEmail_useCase(dependencies).execute(
    userCredentials
   );
   if (userExists) {
    if (userExists.status === false) {
     return res.status(401).json({
      success: false,
      userBlocked: true,
      message: "you have been blocked",
     });
    }
    const token = generateToken(userExists._id, "user", JWT_SECRET!);
    res.cookie("auth_jwt", token, cookieConfig);
    const user = userExists;
    user.token = token;
    res.status(201).json(user);
   } else {
    const strongPassword = Math.random().toString(36).slice(-8);
    userCredentials.password = strongPassword;
    const user = await signUpUser_useCase(dependencies).execute(
     userCredentials
    );
    const token = generateToken(user._id, "user", JWT_SECRET!);
    res.cookie("auth_jwt", token, cookieConfig);
    user.token = token;
    res.status(201).json(user);
   }
  } catch (error) {
   console.log(error, "soemthing went wrong in sending cookie");
  }
 };

 return googleAuth;
};
