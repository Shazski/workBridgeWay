import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";
import editUser_controller from "./editUser_controller";
import updatePassword_controller from "./updatePassword_controller";
import updateEmail_controller from "./updateEmail_controller";
import addUserSkills_controller from "./addUserSkills_controller";
import removeUserSkill_controller from "./removeUserSkill_controller";
import updateUserAbout_controller from "./updateUserAbout_controller";
import addUserSocialLinks_controller from "./addUserSocialLinks_controller";
import removeUserSocialLinks_controller from "./removeUserSocialLinks_controller";
import getAllJobs_controller from "./getAllJobs_controller";
import getJobDetailsById_controller from "./getJobDetailsById_controller";
import uploadResume_controller from "./uploadResume_controller";
import applyForJob_controller from "./applyForJob_controller";
import getUserApplications_controller from "./getUserApplications_controller";
import setUserPreferredCategory_controller from "./setUserPreferredCategory_controller";
import getPreferredJobs_controller from "./getPreferredJobs_controller";
import setUserFmcToken_controller from "./setUserFmcToken_controller";
import getCompanyById_controller from "./getCompanyById_controller";
import getCompanyDetailsByIds_controller from "./getCompanyDetailsByIds_controller";
import confirmSlot_controller from "./confirmSlot_controller";
export = (dependencies: IDependenciesData) => {
 return {
  editUser: editUser_controller(dependencies),
  updatePassword: updatePassword_controller(dependencies),
  updateEmail: updateEmail_controller(dependencies),
  addUserSkills: addUserSkills_controller(dependencies),
  removeSkill: removeUserSkill_controller(dependencies),
  updateUserAbout: updateUserAbout_controller(dependencies),
  addUserSocialLinks: addUserSocialLinks_controller(dependencies),
  removeUserSocialLinks: removeUserSocialLinks_controller(dependencies),
  getAllJobs: getAllJobs_controller(dependencies),
  getJobDetailsById: getJobDetailsById_controller(dependencies),
  uploadResume: uploadResume_controller(dependencies),
  applyForJob: applyForJob_controller(dependencies),
  getUserApplications: getUserApplications_controller(dependencies),
  setUserPreferredCategory: setUserPreferredCategory_controller(dependencies),
  getPreferredJobs: getPreferredJobs_controller(dependencies),
  setUserFmcToken: setUserFmcToken_controller(dependencies),
  getCompanyById: getCompanyById_controller(dependencies),
  getCompanyDetailsByIds: getCompanyDetailsByIds_controller(dependencies),
  confirmSlot: confirmSlot_controller(dependencies),
 };
};
