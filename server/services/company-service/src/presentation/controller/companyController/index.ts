import { IDependencies } from "../../../application/interface/IDependencies";
import addCategory_controller from "./addCategory_controller";
import postJob_controller from "./postJob_controller";
import updateCompany_controller from "./updateCompany_controller";
import getCategoryByCompany_controller from "./getCategoryByCompany_controller";
import getJobs_controller from "./getJobs_controller";
import updateJobStatus_controller from "./updateJobStatus_controller";
import getJobById_controller from "./getJobById_controller";
export = (dependencies: IDependencies) => {
  return {
    updateCompany: updateCompany_controller(dependencies),
    postJob: postJob_controller(dependencies),
    addCategory: addCategory_controller(dependencies),
    getCategoryByCompany: getCategoryByCompany_controller(dependencies),
    getJobs: getJobs_controller(dependencies),
    updateJobStatus: updateJobStatus_controller(dependencies),
    getJobById:getJobById_controller(dependencies)
  };
};
