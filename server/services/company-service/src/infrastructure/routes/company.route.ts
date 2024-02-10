import express from "express";
import { IDependencies } from "../../application/interface/IDependencies";
import companyController from "../../presentation/controller/companyController";

export = (dependencies: IDependencies) => {
  const router = express.Router();
  const { updateCompany,postJob,addCategory } = companyController(dependencies);

  router.put("/update", updateCompany);
  router.post('/post-job',postJob)
  router.post('/add-category',addCategory)
  return router;
};
