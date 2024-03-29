import express from "express";
import { IDependencies } from "../../application/interface/IDependencies";
import companyController from "../../presentation/controller/companyController";
import { verifyCompanyToken } from "work-bridge-way-common";

export = (dependencies: IDependencies) => {
 const router = express.Router();
 const {
  updateCompany,
  postJob,
  getJobs,
  updateJobStatus,
  getJobById,
  editJob,
  getApplicantDetails,
  uppdateApplicantStatus,
  scheduleInterviewForUser,
  cancelInterviewForUser,
  addEmployee,
  getAllCompanyEmployees,
  editEmployee,
  getAllApplicantsSchedule,
  getUserDetailsByIds
 } = companyController(dependencies);

 router.put("/update", verifyCompanyToken, updateCompany);
 router.post("/post-job", verifyCompanyToken, postJob);
 router.get("/get-jobs", verifyCompanyToken, getJobs);
 router.post("/update-job-status", verifyCompanyToken, updateJobStatus);
 router.get("/get-job/:id", verifyCompanyToken, getJobById);
 router.post("/edit-job", verifyCompanyToken, editJob);
 router.get("/get-applicant-details", verifyCompanyToken, getApplicantDetails);
 router.patch(
  "/update-applicant-status",
  verifyCompanyToken,
  uppdateApplicantStatus
 );
 router.post(
  "/schedule-interview",
  verifyCompanyToken,
  scheduleInterviewForUser
 );
 router.patch("/cancel-interview", verifyCompanyToken, cancelInterviewForUser);
 router.post("/add-employee", verifyCompanyToken, addEmployee);
 router.get(
  "/get-company-employees",
  verifyCompanyToken,
  getAllCompanyEmployees
 );
 router.patch("/edit-company-employee", verifyCompanyToken, editEmployee);
 router.get(
  "/get-all-applicant-schedule",
  verifyCompanyToken,
  getAllApplicantsSchedule
 );
 router.get(
  "/get-all-user-details-by-ids",
  verifyCompanyToken,
  getUserDetailsByIds
 );

 return router;
};
