import { ObjectId } from "mongoose";
import { IJob } from "../../../../../application/interface/IJob";
import JobSchema, { IJobsData } from "../../schema/jobSchema";
import { Client } from "../../../redis/client";

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
    await Client.del("jobs");
    const jobData = job as IJobsData;

    return jobData;
  } catch (error) {
    console.log(error, "<< Something went wrong in post job repo >>");
    return false;
  }
};
export const updateJobStatus = async (updateData: {
  status: boolean;
  id: ObjectId;
}): Promise<IJobsData | boolean> => {
  try {
    const job = await JobSchema.findOneAndUpdate(
      {
        _id: updateData.id,
      },
      { status: updateData.status },
      { new: true }
    );

    if (!job) return false;

    await Client.del("jobs");
    const jobData = job as IJobsData;

    return jobData;
  } catch (error) {
    console.log(error, "<< Something went wrong in update job status repo >>");
    return false;
  }
};

export const getAllCompanyJobs = async (
  companyId: ObjectId
): Promise<IJob[] | boolean> => {
  try {
    const cachedJob = await Client.get("jobs");
    if (cachedJob) {
      await Client.expire("jobs", 10);
      return JSON.parse(cachedJob);
    }
    const jobs: IJob[] = await JobSchema.find({ companyId: companyId });

    if (!jobs) return false;

    await Client.set("jobs", JSON.stringify(jobs));
    return jobs as IJob[];
  } catch (error) {
    console.log(error, "<< Something went wrong in getAllcompnayrepo >>");
    return false;
  }
};
export const getJobById = async (id: ObjectId): Promise<IJob | boolean> => {
  try {
    const job: IJob | null = await JobSchema.findOne({ _id: id });

    if (!job) return false;

    return job as IJob;
  } catch (error) {
    console.log(error, "<< Something went wrong in getJobById >>");
    return false;
  }
};
