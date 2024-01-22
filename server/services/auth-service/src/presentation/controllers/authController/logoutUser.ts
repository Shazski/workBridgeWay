import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../../utils";

export = () => {
  const logoutUser = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("user_jwt");
      return res.json({ success: true, message: "successfully logged out" });
    } catch (error) {
      next(ErrorResponse.badRequest("something went wrong"));
    }
  };
  return logoutUser
};
