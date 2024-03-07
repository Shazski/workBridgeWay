import { ObjectId } from "mongoose";
import { IDependencies } from "../../interface/IDependencies";

export const cancelInterviewForUser_useCase = (dependencies: IDependencies) => {
 const {
  job_repo: { cancelInterviewForUser },
 } = dependencies;
 const execute = (
  jobId: ObjectId,
  userId: ObjectId,
  scheduleId:ObjectId
 ) => {
  try {
   return cancelInterviewForUser(jobId, userId, scheduleId);
  } catch (error) {
   console.log(
    error,
    " << Something went wrong in cancelInterviewForUser_useCase >> "
   );
   return false;
  }
 };

 return { execute };
};
