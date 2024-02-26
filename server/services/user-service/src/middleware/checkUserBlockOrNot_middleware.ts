import { Request, Response, NextFunction } from "express";
import UsersSchema from "../infrastructure/database/mongodb/schema/userSchema";
import { getUserById } from "work-bridge-way-common";
import { JWT_SECRET } from "../config";
export const checkUserBlockOrNot = async (
 req: Request,
 res: Response,
 next: NextFunction
) => {
 const token = req.cookies?.auth_jwt;
 if (!token) {
  return res.status(401).json({
   success: false,
   authenticationFailed: true,
   message: "Token is invalid",
  });
 }

 const userId = getUserById(token, JWT_SECRET!);
 const user = await UsersSchema.findById(userId);
 if (user?.status === false) {
  return res.status(401).json({
   success: false,
   userBlocked: true,
   message: "you have been blocked",
  });
 } else {
  next();
 }
};
