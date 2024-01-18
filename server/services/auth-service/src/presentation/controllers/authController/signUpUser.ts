import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../../utils";
import { SignUpValidator } from "../../../utils";
import { DependenciesData } from "../../../application/interfaces/IDependencies";
import { generateToken } from "../../../utils/externalServices/jwt/generateToken";
import { cookieConfig } from "../../../utils/constants/constant";
export = (dependencies: DependenciesData): any => {
  const {
    user_useCase: {
      findUserByEmail_useCase,
      signUpUser_useCase,
      sendOtp_useCase,
      verifyOtp_useCase,
    },
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
        userCredentials
      );

      if (userExist) {
        return next(
          ErrorResponse.forbidden(
            "Email or Phone already resgitered, try another email"
          )
        );
      }
    } catch (error) {
      console.log(error, "<< Something went Wrong>>");
      next(error);
    }
    //if user not present sent otp to user using nodemailer
    if (!userCredentials.otp) {
      try {
        const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

        await sendOtp_useCase(dependencies).execute(userCredentials.email, otp);

        return res.json({ success: true, message: "Otp sent successfully" });
      } catch (error) {
        console.log(error, "<< Something Went Wrong in OTP section >>");
        return res.json({
          success: false,
          message: "Something went wrong in otp",
        });
      }
    }

    //verify otp if otp is present
    try {
      const isOtpVerified = await verifyOtp_useCase(dependencies).execute(
        userCredentials.email,
        userCredentials.otp
      );
      if (!isOtpVerified)
        return next(ErrorResponse.unauthorized("Otp is Invalid try another"));
    } catch (error) {
      console.log(error, "<< Something went wrong in verifyOtp >>");
      return res.json({
        success: false,
        message: "Otp invalid",
      });
    }

    //create a new user if otp is present
    if (userCredentials.otp) {
      try {
        const userData = await signUpUser_useCase(dependencies).execute(
          userCredentials
        );
        if (!userData)
          return res.json({
            success: false,
            message: "Phone number already existing",
          });

        const token =  generateToken(userData._id);
        res.cookie("user_jwt", token, cookieConfig);
        res.status(201).json({ success: true, userData, token });
      } catch (error) {
        console.log(error, "<<Something went wrong in user signup>>");
      }
    }
  };
  return signUpUser;
};
