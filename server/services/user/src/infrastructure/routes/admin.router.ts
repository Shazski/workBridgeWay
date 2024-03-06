import { IDependenciesData } from "../../application/interfaces/IDependenciesData";
import express from "express";
import adminController from "../../presentation/controllers/adminController";
import { verifyAdminToken } from "work-bridge-way-common";
export = (dependencies: IDependenciesData) => {
 const {
  getAllCompany,
  updateRequest,
  addCategory,
  getCategory,
  getAllUsers,
  blockOrUnblockUser,
 } = adminController(dependencies);
 const router = express.Router();
 router.get("/get-requests",verifyAdminToken, getAllCompany);
 router.post("/approve-or-reject-request", verifyAdminToken, updateRequest);
 router.post("/add-category", verifyAdminToken, addCategory);
 router.get("/get-categories", getCategory);
 router.get("/get-all-users", verifyAdminToken, getAllUsers);
 router.put("/update-user-status", verifyAdminToken, blockOrUnblockUser);
 return router;
};
