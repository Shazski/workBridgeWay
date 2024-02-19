import express from "express";
import { IDependencies } from "../../application/interface/IDependencies";
import companyController from "../../presentation/controller/companyController";

export = (dependencies: IDependencies) => {
  const router = express.Router();
  const {
    updateCompany,
    postJob,
    addCategory,
    getCategoryByCompany,
    getJobs,
    updateJobStatus,
    getJobById,
  } = companyController(dependencies);

  router.put("/update", updateCompany);
  router.post("/post-job", postJob);
  router.post("/add-category", addCategory);
  router.get("/get-category", getCategoryByCompany);
  router.get("/get-jobs", getJobs);
  router.post("/update-job-status", updateJobStatus);
  router.get("/get-job/:id", getJobById);
  return router;
};
