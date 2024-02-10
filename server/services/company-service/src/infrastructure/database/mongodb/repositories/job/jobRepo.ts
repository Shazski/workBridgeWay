import { ObjectId } from "mongoose";
import { IJob } from "../../../../../application/interface/IJob";
import JobSchema, { IJobsData } from "../../schema/jobSchema";

export const postJob = async (
  credentials: IJob,
  companyId: ObjectId
): Promise<IJobsData | boolean> => {
  try {
    const job = await JobSchema.create({
      ...credentials,
      companyId,
    });

    if (!job) return false;

    const jobData = job as IJobsData;

    return jobData;
  } catch (error) {
    console.log(error, "<< Something went wrong in post job repo >>");
    return false;
  }
};
