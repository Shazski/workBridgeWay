import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../../utils";
import { SignUpValidator } from "../../../utils";
export = (dependencies: any): any => {
  const {
    user_useCase: { findUserByEmail_useCase, signUpUser_useCase },
  } = dependencies;

  const signUpUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userCredentials = req.body;
    const { error, value: data } = SignUpValidator.validator.validate(
      userCredentials,
      { abortEarly: true }
    );
    //To check whether the user email is taken or not
    try {
      const userExist = await findUserByEmail_useCase(dependencies).execute(
        userCredentials?.email
      );

      if (userExist) {
        return next(
          ErrorResponse.forbidden("Email already resgitered, try another email")
        );
      }
    } catch (error) {
      console.log(error, "<< Something went Wrong>>");
      next(error);
    }
    //Check whether the otp is correct or wrong

    //create a new user
    try {
      const userData = await signUpUser_useCase(dependencies).execute(
        userCredentials
      );
      if(!userData) return res.json({success:false, message:"Phone number already existing"})
      console.log(userData, "my user data");
      res.status(201).json({ success: true, userData });
    } catch (error) {
      console.log(error, "eror");
    }
  };
  return signUpUser;
};
