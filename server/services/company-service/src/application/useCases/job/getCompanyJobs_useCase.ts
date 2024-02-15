import { ObjectId } from "mongoose";
import { IDependencies } from "../../interface/IDependencies";
import { Client } from './../../../infrastructure/database/redis/client';

export const getCompanyJobs_useCase = (dependencies: IDependencies) => {
  const {
    job_repo: { getAllCompanyJobs },
  Client} = dependencies;
  const execute = (companyId: ObjectId) => {
    try {
      return getAllCompanyJobs(companyId);
    } catch (error) {
      console.log(
        error,
        " << Something went wrong in getallcompanyJobs useCase >> "
      );
      return false;
    }
  };

  return { execute };
};
