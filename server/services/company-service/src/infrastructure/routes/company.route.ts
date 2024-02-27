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
    editJob
  } = companyController(dependencies);

  router.put("/update", verifyCompanyToken,updateCompany);
  router.post("/post-job",verifyCompanyToken, postJob);
  router.get("/get-jobs",verifyCompanyToken,getJobs);
  router.post("/update-job-status",verifyCompanyToken, updateJobStatus);
  router.get("/get-job/:id",verifyCompanyToken, getJobById);
  router.post("/edit-job",verifyCompanyToken, editJob);
  return router;
};
