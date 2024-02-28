// import { NextFunction, Request, Response } from "express";
// import { IDependencies } from "../../../application/interface/IDependencies";
// import { getUserById } from "work-bridge-way-common";
// import { ErrorResponse } from "work-bridge-way-common";
// import { JWT_SECRET } from "../../../config";

// export default (dependencies: IDependencies) => {
//  const {
//   company_useCase: { getAllApplicants_useCase },
//  } = dependencies;

//  const getAllApplicants = async (req: Request, res: Response, next: NextFunction) => {
//   const page = req.query.page || 1;
//   const search = req.query.search || "";
//   try {
//    const token = req.cookies["auth_jwt"];

//    const companyId: string | boolean = getUserById(token, JWT_SECRET!);

//    if (!token || companyId === "") {
//     return next(ErrorResponse.unauthorized("Company Autherization failed"));
//    }
//    const applicants = await getAllApplicants_useCase(dependencies).execute(
//     companyId,
//    );

//    if (!applicants) return next(ErrorResponse.badRequest("applicants not found"));

//    res.status(200).json(applicants);
//   } catch (error) {
//    console.log(
//     error,
//     "<< Something went wrong in getcompanyjobs controller >>"
//    );
//    next(error);
//   }
//  };

//  return getAllApplicants;
// };
