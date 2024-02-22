import { ObjectId } from "mongoose";
import { IDependencies } from "../../interface/IDependencies";

export const getCompanyJobs_useCase = (dependencies: IDependencies) => {
 const {
  job_repo: { getAllCompanyJobs },
 } = dependencies;
 const execute = (companyId: ObjectId,page:number,search:string) => {
  try {
   return getAllCompanyJobs(companyId, page, search);
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
