import express from "express";
import { IDependencies } from "../../application/interface/IDependencies";
import companyController from "../../presentation/controller/companyController";

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

  router.put("/update", updateCompany);
  router.post("/post-job", postJob);
  router.get("/get-jobs", getJobs);
  router.post("/update-job-status", updateJobStatus);
  router.get("/get-job/:id", getJobById);
  router.post("/edit-job", editJob);
  return router;
};
