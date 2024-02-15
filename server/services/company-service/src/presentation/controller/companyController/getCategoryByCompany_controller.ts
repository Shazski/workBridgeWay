import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";
import { getCompanyId } from "../../../utils/jwt/verifyJwt";
import ErrorResponse from "../../../utils/error/errorResponse";
import { ICategoryData } from "../../../infrastructure/database/mongodb/schema/categorySchema";

export default (dependencies: IDependencies) => {
  const {
    category_useCase: { getCategoryByCompany },
  } = dependencies;
  const getCategoryByCompanyId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.cookies["auth_jwt"];
      const companyId: string = getCompanyId(token);

      if (!token || !companyId) {
        return next(ErrorResponse.unauthorized("company Autherization failed"));
      }

      const category: ICategoryData[] | null = await getCategoryByCompany(
        dependencies
      ).execute(companyId);

      if (!category)
        return next(
          ErrorResponse.badRequest("Category not found with the companyId")
        );
      res.status(200).json(category);
    } catch (error) {
      console.log(
        error,
        "<< Something went wrong in getCategoryByCompany controller >>"
      );
      next(error);
    }
  };

  return getCategoryByCompanyId;
};
