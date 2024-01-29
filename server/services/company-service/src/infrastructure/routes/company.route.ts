import express from "express";
import { IDependencies } from "../../application/interface/IDependencies";
import companyController from "../../presentation/controller/companyController";

export = (dependencies: IDependencies) => {
  const router = express.Router();
  const { getCompanyRequest } = companyController(dependencies);
  router.get("/get-requests", getCompanyRequest);
  return router;
};
