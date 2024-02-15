import { ObjectId } from "mongoose";
import { IDependencies } from "../../interface/IDependencies";
import { IJob } from "../../interface/IJob";

export const postJob_useCase = (dependencies: IDependencies) => {
  const {
    job_repo: { postJob },
  } = dependencies;

  const execute = async (credentials: IJob, companyId: ObjectId) => {
    try {
      const job = await postJob(credentials, companyId);

      if (!job) return false;

      return job;
    } catch (error) {
      console.log(error, "<< Something went wrong in post job useCase >>");
      return false;
    }
  };

  return { execute };
};
