import { IDependencies } from "../../../application/interface/IDependencies";
import postJob_controller from "./postJob_controller";
import updateCompany_controller from "./updateCompany_controller";
import getJobs_controller from "./getJobs_controller";
import updateJobStatus_controller from "./updateJobStatus_controller";
import getJobById_controller from "./getJobById_controller";
import editJobDetails_controller from "./editJobDetails_controller";
// import getAllApplicants_controller from "./getAllApplicants_controller";
export = (dependencies: IDependencies) => {
  return {
    updateCompany: updateCompany_controller(dependencies),
    postJob: postJob_controller(dependencies),
    getJobs: getJobs_controller(dependencies),
    updateJobStatus: updateJobStatus_controller(dependencies),
    getJobById: getJobById_controller(dependencies),
    editJob:editJobDetails_controller(dependencies),
    // getAllApplicants:getAllApplicants_controller(dependencies),
  };
};
