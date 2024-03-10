import { IDependencies } from "../../../application/interface/IDependencies";
import postJob_controller from "./postJob_controller";
import updateCompany_controller from "./updateCompany_controller";
import getJobs_controller from "./getJobs_controller";
import updateJobStatus_controller from "./updateJobStatus_controller";
import getJobById_controller from "./getJobById_controller";
import editJobDetails_controller from "./editJobDetails_controller";
import getApplicantDetails_controller from "./getApplicantDetails_controller";
import updateApplicantStatus_controller from "./updateApplicantStatus_controller";
import scheduleInterviewForUser_controller from "./scheduleInterviewForUser_controller";
import cancelInterviewForUser_controller from "./cancelInterviewForUser_controller";
import addEmployee_controller from "./addEmployee_controller";
import getAllCompanyEmployees_controller from "./getAllCompanyEmployees_controller";
export = (dependencies: IDependencies) => {
  return {
    updateCompany: updateCompany_controller(dependencies),
    postJob: postJob_controller(dependencies),
    getJobs: getJobs_controller(dependencies),
    updateJobStatus: updateJobStatus_controller(dependencies),
    getJobById: getJobById_controller(dependencies),
    editJob:editJobDetails_controller(dependencies),
    getApplicantDetails:getApplicantDetails_controller(dependencies),
    uppdateApplicantStatus:updateApplicantStatus_controller(dependencies),
    scheduleInterviewForUser:scheduleInterviewForUser_controller(dependencies),
    cancelInterviewForUser:cancelInterviewForUser_controller(dependencies),
    addEmployee:addEmployee_controller(dependencies),
    getAllCompanyEmployees:getAllCompanyEmployees_controller(dependencies),
  };
};
