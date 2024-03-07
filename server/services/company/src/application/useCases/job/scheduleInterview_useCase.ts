import { ObjectId } from "mongoose";
import { IDependencies } from "../../interface/IDependencies";
import { IJob } from "../../interface/IJob";

export const scheduleInterview_useCase = (dependencies: IDependencies) => {
 const {
  job_repo: { scheduleInterviewForUser },
 } = dependencies;
 const execute = (
  jobId: ObjectId,
  userId: ObjectId,
  scheduleData: {
   testType: string;
   date: string;
   time: string;
   employeeId: ObjectId;
  }
 ) => {
  try {
   return scheduleInterviewForUser(jobId, userId, scheduleData);
  } catch (error) {
   console.log(
    error,
    " << Something went wrong in scheduleInterview_useCase >> "
   );
   return false;
  }
 };

 return { execute };
};
