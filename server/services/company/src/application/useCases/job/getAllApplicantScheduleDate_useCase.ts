import { ObjectId } from "mongoose";
import { IDependencies } from "../../interface/IDependencies";

export const getAllApplicantScheduleDate_useCase = (
 dependencies: IDependencies
) => {
 const {
  job_repo: { getAllApplicantsSchedule },
 } = dependencies;

 const execute = async (companyId: ObjectId) => {
  try {
   return await getAllApplicantsSchedule(companyId);
  } catch (error) {
   console.log(
    error,
    "<< Something went wrong in getAllApplicantScheduleDate_useCase >>"
   );
   return false;
  }
 };
 return {
  execute,
 };
};
