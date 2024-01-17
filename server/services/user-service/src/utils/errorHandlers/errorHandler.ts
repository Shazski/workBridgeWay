import { Request, Response, NextFunction } from "express";
import ErrorResponse from "./errorResponse";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);

  if (err instanceof ErrorResponse) {
    return res.status(err.status).json({
      success: false,
      status: err.status,
      message: err.message,
    });
  }
  return res.status(500).json({
    success: false,
    status: 500,
    message: "Something went wrong",
  });
};

export default errorHandler;
