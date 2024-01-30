import { NextFunction, Request, Response } from "express";
import { DependenciesData } from "../../../application/interfaces/IDependencies";
import { ErrorResponse, dependencies, generateToken } from "../../../utils";
import bcrypt from "bcrypt";
export = (dependencies: DependenciesData) => {
  const {
    user_useCase: { findUserByEmail_useCase, findCompanyByEmail_useCase },
  } = dependencies;
  const login = async (req: Request, res: Response, next: NextFunction) => {
    const userCredentials = req.body;
    try {
      const user = await findUserByEmail_useCase(dependencies).execute(
        userCredentials
      );
      console.log(user, "user data");
      if (!user)
        return next(ErrorResponse.unauthorized("The email is not registered"));

      if (user.role === "user" || user.role === "admin") {
        if (!user.status) {
          return next(
            ErrorResponse.unauthorized("You Have been blocked by Admin")
          );
        }
        const passwordMatch = bcrypt.compareSync(
          userCredentials.password,
          user.password
        );
        if (!passwordMatch)
          return next(
            ErrorResponse.unauthorized("Incorrect password or email")
          );
        const token = generateToken(user._id);
        return res.cookie("user_auth", token).status(200).json(user);
      } else if (user.role === "company") {
        const company = await findCompanyByEmail_useCase(dependencies).execute(
          userCredentials
        );

        if (!company?.approved) {
          return next(
            ErrorResponse.unauthorized(
              `You are not approved by admin if approved you will recieve a mail`
            )
          );
        }
        const passwordMatchCompany = bcrypt.compareSync(
          userCredentials.password,
          company.password
        );
        if (!passwordMatchCompany)
          return next(
            ErrorResponse.unauthorized("email or password is incorrect")
          );
        const token = generateToken(user._id);
        res.cookie("company_auth", token).status(200).json(user);
      } else {
        console.log("else case work");
      }
    } catch (error) {
      console.log(" Something went wrong in login controller ");
      next(error);
    }
  };
  return login;
};
