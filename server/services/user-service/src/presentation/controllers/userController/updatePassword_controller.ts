import { NextFunction, Request, Response } from "express";
import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";
import { ErrorResponse } from "work-bridge-way-common";
import { isPasswordMatch } from "../../../utils/externalService/bcrypt/bcrypt";

export = (dependencies: IDependenciesData) => {
  const {
    user_useCase: { findUserByEmail_useCase, editUser_useCase },
  } = dependencies;
  const updatePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userCredentials = req.body;
    try {
      //check Whether the user is present or not
      const userExists = await findUserByEmail_useCase(dependencies).execute(
        userCredentials
      );
      if (!userExists)
        return next(
          ErrorResponse.notFound("email is not present provide valid email")
        );

      //check whether the old password matches or not
      const passwordMatch = isPasswordMatch(
        userCredentials.oldPassword,
        userExists.password
      );
      if (!passwordMatch)
        return next(
          ErrorResponse.unauthorized(
            "Old password is not matching please try another"
          )
        );

      const newUserCredentials = {
        email: userCredentials.email,
        password: userCredentials.newPassword,
      };
      const user = await editUser_useCase(dependencies).execute(
        newUserCredentials
      );

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };
  return updatePassword;
};
