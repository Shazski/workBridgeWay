import { NextFunction, Request, Response } from "express";
import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";
import { ErrorResponse } from "work-bridge-way-common";
import sendRequestUpdationMail from "../../../utils/externalService/nodemailer/sendRequestUpdateMail";

export = (dependencies: IDependenciesData) => {
  const {
    admin_useCase: { updateCompanyRequest_useCase },
  } = dependencies;
  const updateRequest = async (req: Request, res: Response, next: NextFunction) => {
    const credentials = req.body;
    try {
        const success = await  updateCompanyRequest_useCase(dependencies).execute(credentials);

        if(!success) return next(ErrorResponse.internalError("Something went wrong"))

        //sent a mail for informing the request updation
        if(credentials.rejectReason) {
          sendRequestUpdationMail(credentials.email,credentials.stage,credentials.rejectReason)
        } else {
          sendRequestUpdationMail(credentials.email,credentials.stage)
        }
        
        return res.status(201).json({success:true,  message:"Request updated successfully"});
    } catch (error) {
        console.log(error, "<<Something went wrong in update request controller >>")
        next(error)
    }
  };

  return updateRequest;
};
