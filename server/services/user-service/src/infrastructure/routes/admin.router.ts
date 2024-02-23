import { IDependenciesData } from "../../application/interfaces/IDependenciesData";
import express from "express";
import adminController from "../../presentation/controllers/adminController";
import { verifyToken } from "work-bridge-way-common";
export = (dependencies: IDependenciesData) => {
 const { getAllCompany, updateRequest, addCategory, getCategory, getAllUsers } =
  adminController(dependencies);
 const router = express.Router();
 router.get("/get-requests", getAllCompany);
 router.post("/approve-or-reject-request", verifyToken, updateRequest);
 router.post("/add-category", verifyToken, addCategory);
 router.get("/get-categories", verifyToken, getCategory);
 router.get("/get-all-users", verifyToken, getAllUsers);
 return router;
};
