import { Request, Response, NextFunction } from "express";
import { DependenciesData } from "../../../application/interfaces/IDependencies";
import {ErrorResponse, generateToken } from "work-bridge-way-common";
import { cookieConfig } from "../../../utils/constants/constant";
import { JWT_SECRET } from "../../../config";
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

    //To check whether the user email is taken or not
    if (!userCredentials.otp) {
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
    }
    //if user not present sent otp to user using nodemailer
    if (!userCredentials.otp) {
      try {
        const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

        await sendOtp_useCase(dependencies).execute(userCredentials.email, otp);
        const { confirmPassword, ...restValues } = userCredentials;
        return res.json({
          user: restValues,
          success: true,
          message: "Otp sent successfully",
        });
      } catch (error) {
        console.log(error, "<< Something Went Wrong in OTP section >>");
        return res.json({
          success: false,
          message: "Something went wrong in otp",
        });
      }
    }

    //verify otp if otp is present
    if (userCredentials.otp) {
      try {
        const isOtpVerified = await verifyOtp_useCase(dependencies).execute(
          userCredentials.email,
          userCredentials.otp
        );
        if (!isOtpVerified) {
          const { confirmPassword, ...restValues } = userCredentials;
          return res.status(401).json({
            user: restValues,
            success: false,
            message: "Otp is Invalid try another",
          });
        }
      } catch (error) {
        console.log(error, "<< Something went wrong in verifyOtp >>");
        return res.json({
          success: false,
          message: "Otp invalid",
        });
      }
    }

    //create a new user if otp is present
    if (userCredentials.otp) {
      try {
        const user = await signUpUser_useCase(dependencies).execute(
          userCredentials
        );
        if (!user)
          return res.json({
            success: false,
            message: "Something Went wrong try again in create user",
          });

        const token = generateToken(user._id, "user",JWT_SECRET!);
        res.cookie("auth_jwt", token, cookieConfig);
        user.token = token
        res.status(201).json(user);
      } catch (error) {
        console.log(error, "<<Something went wrong in user signup>>");
      }
    }
  };
  return signUpUser;
};
