import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";
import { getUserById, ErrorResponse } from "work-bridge-way-common";
import { JWT_SECRET } from "../../../config";

export = (dependencies: IDependencies) => {
  const {
    company_useCase: { updateCompany_useCase },
  } = dependencies;
  const updateCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const credentials = req.body;
    try {
      const token = req.cookies["auth_jwt"];
      const companyId:string | boolean = getUserById(token, JWT_SECRET!);

      const company = await updateCompany_useCase(dependencies).execute(
        credentials,
        companyId
      );
      if (!company)
        return next(
          ErrorResponse.forbidden("Something went wrong please try again")
        );
      const resData = { ...company };
      resData._doc.role = "company";
      console.log(resData._doc);
      res.status(201).json(resData._doc);
    } catch (error) {
      console.log(
        error,
        "<< Something went wrong in updateCompany controller>>"
      );
    }
  };
  return updateCompany;
};
