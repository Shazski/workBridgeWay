import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";
import ErrorResponse from "../../../utils/error/errorResponse";
import { getCompanyId } from "../../../utils/jwt/verifyJwt";

export = (dependencies: IDependencies) => {
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
      const token = req.cookies["auth_jwt"];
      const companyId: string = getCompanyId(token);

      if (!token || !companyId) {
        return next(ErrorResponse.unauthorized("Company Autherization Failed"));
      }
      const category = await addCategory_useCase(dependencies).execute(
        credentials,
        companyId
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
