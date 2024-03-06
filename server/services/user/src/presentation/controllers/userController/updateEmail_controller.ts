import { NextFunction, Request, Response } from "express";
import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";
import { ErrorResponse } from "work-bridge-way-common";

export = (dependencies: IDependenciesData) => {
  const {
    user_useCase: {
      findUserByEmail_useCase,
      sendOtp_useCase,
      verifyOtp_useCase,
      editUser_useCase,
    },
  } = dependencies;
  const updateEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userCredentials = req.body;
    //To check whether the newEmail is present or not.
    if (!userCredentials.otp) {
      try {
        const newEmailExists = await findUserByEmail_useCase(
          dependencies
        ).execute(userCredentials);

        if (newEmailExists)
          return next(
            ErrorResponse.conflict(
              "Try another email this email is already taken"
            )
          );

        //changing the oldEmail name to email because the useCase is checking the name as email !oldEmail
        const userCredential = {
          email: req.body.oldEmail,
        };
        const userDetails = await findUserByEmail_useCase(dependencies).execute(
          userCredential
        );

        if (!userDetails)
          return next(ErrorResponse.unauthorized("Email is not registered"));
      } catch (error) {
        console.log("<<Something went wrong in upadte email controller>>");
        return next(error);
      }
      //Sent mail to new email
      try {
        const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        const otpSaved = await sendOtp_useCase(dependencies).execute(
          userCredentials.email,
          otp
        );

        if (!otpSaved) return next(ErrorResponse.forbidden("Forbidden"));

        res.status(200).json({ success: true, message: userCredentials.email });
      } catch (error) {
        console.log(error, "Something went wrong");
        return next(error);
      }
    } else {
    }
    //verify Email if otp is present
    if (userCredentials.otp) {
      try {
        const otpVerified = await verifyOtp_useCase(dependencies).execute(
          userCredentials.email,
          userCredentials.otp
        );
        if (!otpVerified)
          return next(ErrorResponse.notFound("Otp is invalid try another"));
      } catch (error) {
        console.log("Soemthing went Wrong in verifying otp");
        return next(error);
      }
      //update email if otp is verified
      try {
        const UpdateData = {
          email: userCredentials.email,
          oldEmail: userCredentials.oldEmail,
        };
        const user = await editUser_useCase(dependencies).execute(UpdateData);
        if (!user) return next(ErrorResponse.notFound("credentials not found"));

        res.status(201).json(user);
      } catch (error) {
        return next(error);
      }
    }
  };
  return updateEmail;
};
