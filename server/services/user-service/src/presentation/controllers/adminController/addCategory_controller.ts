import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "work-bridge-way-common";
import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";

export = (dependencies: IDependenciesData) => {
  const {
    category_useCase: { addCategory_useCase },
  } = dependencies;
  const addCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const credentials = req.body;
    try {

      const category = await addCategory_useCase(dependencies).execute(
        credentials
      );
      if (!category)
        return next(ErrorResponse.notFound("Failed to add category"));

      res.status(201).json(category);
    } catch (error) {
      console.log(
        error,
        "<< Something went wrong in add category controller >>"
      );
      next(error);
    }
  };
  return addCategory;
};
