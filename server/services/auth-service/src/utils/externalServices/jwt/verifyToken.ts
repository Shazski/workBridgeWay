import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, Secret, VerifyErrors } from "jsonwebtoken";
import { JWT_SECRET } from "../../../config";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies("auth_jwt") || req.headers[`authorization`]?.split(" ")[1];
    if (!token) {
      return res
        .status(404)
        .json({ success: false, message: " Token doesn't exist!" });
    }

    jwt.verify(token, JWT_SECRET as Secret, (err: any, decoded: any) => {
      if (err)
        return res.status(404).json({ success: false, message: err?.message });
      next();
    });
  } catch (error) {
    console.log("<< Something went wrong in verifying token >>");
    next(error)
  }
};
