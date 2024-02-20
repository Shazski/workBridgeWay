import { IDependenciesData } from "../../application/interfaces/IDependenciesData";
import express from "express";
import adminController from "../../presentation/controllers/adminController";
export = (dependencies: IDependenciesData) => {
  const { getAllCompany, updateRequest, addCategory, getCategory } =
    adminController(dependencies);
  const router = express.Router();
  router.get("/get-requests", getAllCompany);
  router.post("/approve-or-reject-request", updateRequest);
  router.post("/add-category", addCategory);
  router.get("/get-categories", getCategory);
  return router;
};
