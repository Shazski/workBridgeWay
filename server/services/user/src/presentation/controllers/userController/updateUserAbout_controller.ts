import { NextFunction, Request, Response } from "express";
import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";
import { ErrorResponse } from "work-bridge-way-common";

export = (dependencies: IDependenciesData) => {
  const {
    user_useCase: { updateUserAbout_useCase },
  } = dependencies;
  const updateUserAbout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userCredentials = req.body;
    try {
      const user = await updateUserAbout_useCase(dependencies).execute(
        userCredentials
      );

      if (!user)
        return next(ErrorResponse.internalError("Not able to Update About Me"));

      res.status(201).json(user);
    } catch (error) {
      console.log("<<Something went wrong in updateUserAbout controller>>");
      next(error);
    }
  };
  return updateUserAbout;
};
