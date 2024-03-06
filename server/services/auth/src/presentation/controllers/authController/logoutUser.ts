import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "work-bridge-way-common";
import { DependenciesData } from "../../../application/interfaces/IDependencies";

export = (dependencies: DependenciesData) => {
  const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("auth_jwt");
      return res.json({ success: true, message: "successfully logged out" });
    } catch (error) {
      next(ErrorResponse.badRequest("something went wrong"));
    }
  };
  return logoutUser
};
