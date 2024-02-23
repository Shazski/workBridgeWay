import express from "express";
import { IDependencies } from "../../application/interface/IDependencies";
import companyController from "../../presentation/controller/companyController";
import { verifyToken } from "work-bridge-way-common";
import { JWT_SECRET } from "../../config";

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

  router.put("/update", verifyToken,updateCompany);
  router.post("/post-job",verifyToken, postJob);
  router.get("/get-jobs",verifyToken,getJobs);
  router.post("/update-job-status",verifyToken, updateJobStatus);
  router.get("/get-job/:id",verifyToken, getJobById);
  router.post("/edit-job",verifyToken, editJob);
  return router;
};
