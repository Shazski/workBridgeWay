import { NextFunction, Request, Response } from "express";
import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";
import { ErrorResponse } from "work-bridge-way-common";
import { ICategoryData } from "../../../infrastructure/database/mongodb/schema/categorySchema";


export default (dependencies: IDependenciesData) => {
  const {
    category_useCase: { getCategoryByCompany },
  } = dependencies;
  const getCategoryByCompanyId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const category: ICategoryData[] | null = await getCategoryByCompany(
        dependencies
      ).execute();

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
