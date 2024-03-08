import { ObjectId } from "mongoose";
import { IDependencies } from "../../interface/IDependencies";
import { IJob } from "../../interface/IJob";

export const updateApplicantJobStatus_useCase = (
 dependencies: IDependencies
) => {
 const {
  job_repo: { updateApplicantStatus },
 } = dependencies;
 const execute = (applicantId: ObjectId, jobId: ObjectId, status: string) => {
  try {
   return updateApplicantStatus(applicantId, jobId, status);
  } catch (error) {
   console.log(error, " << Something went wrong in editJob useCase >> ");
   return false;
  }
 };

 return { execute };
};
