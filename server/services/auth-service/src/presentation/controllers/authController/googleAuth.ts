import { NextFunction, Request, Response } from "express";
import { DependenciesData } from "../../../application/interfaces/IDependencies";
import { generateToken } from "../../../utils";
import { cookieConfig } from "../../../utils/constants/constant";
import sentGoogleAuthPasswordMail from "../../../utils/externalServices/nodemailer/sentGoogleAuthPassword";

export = (dependencies: DependenciesData) => {
  const {
    user_useCase: { findUserByEmail_useCase, signUpUser_useCase },
  } = dependencies;

  const googleAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userCredentials = req.body;
    try {
      const userExists = await findUserByEmail_useCase(dependencies).execute(
        userCredentials
      );
      if (userExists) {
        const token = generateToken(userExists._id);
        res.cookie("user_jwt", token, cookieConfig);
        const user = userExists;
        res.status(201).json(user);
      } else {
        const strongPassword = Math.random().toString(36).slice(-8);
        userCredentials.password = strongPassword;
        const user = await signUpUser_useCase(dependencies).execute(
          userCredentials
        );
        if(user)
        await sentGoogleAuthPasswordMail(user.email, strongPassword);

        res.status(201).json(user);
      }
    } catch (error) {
      console.log(error, "soemthing went wrong oinm seetong cokie");
    }
  };

  return googleAuth;
};
