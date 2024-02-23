import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";
import { ErrorResponse } from "work-bridge-way-common";

export default (dependencies: IDependencies) => {
  const {
    job_useCase: { updateJobStatus_useCase },
  } = dependencies;

  const updateJobStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const updateData = req.body;
    const page = req.query.page || 1
    const search = req.query.search || ""
    try {
      const updatedJob = await updateJobStatus_useCase(dependencies).execute(
        updateData,page,search
      );
      if (!updatedJob)
        return next(ErrorResponse.badRequest("status is not updated"));

      return res.status(201).json(updatedJob);
    } catch (error) {
      console.log(
        error,
        "<< Something went wrong in updateJobStatus controller >>"
      );
      next(error);
    }
  };
  return updateJobStatus
};
