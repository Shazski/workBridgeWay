import { NextFunction, Request, Response } from "express";
import { DependenciesData } from "../../../application/interfaces/IDependencies";
import { ErrorResponse, dependencies, generateToken } from "../../../utils";
import bcrypt from "bcrypt";
import { cookieConfig } from "../../../utils/constants/constant";
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
        delete user.password;
        user.token = token
        return res
          .cookie("auth_jwt", token, cookieConfig)
          .status(200)
          .json(user);
      } else if (user.role === "company") {
        const company = await findCompanyByEmail_useCase(dependencies).execute(
          userCredentials
        );

        // if (!company?.approved) {
        //   return next(
        //     ErrorResponse.unauthorized(
        //       `You are not approved by admin if approved you will recieve a mail`
        //     )
        //   );
        // }
        const passwordMatchCompany: boolean = bcrypt.compareSync(
          userCredentials.password,
          company.password
        );
        if (!passwordMatchCompany)
          return next(
            ErrorResponse.unauthorized("email or password is incorrect")
          );
        const token = generateToken(company._id);
        delete user.password;
        company.role = "company"
        user.token = token
        res.cookie("auth_jwt", token, cookieConfig).status(200).json(company);
      } else {
        console.log("else case worked");
      }
    } catch (error) {
      console.log(" Something went wrong in login controller ");
      next(error);
    }
  };
  return login;
};
