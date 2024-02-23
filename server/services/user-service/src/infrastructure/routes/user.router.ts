import express from "express";
import { userController } from "../../presentation/controllers";
import { IDependenciesData } from "../../application/interfaces/IDependenciesData";
import { verifyToken } from "work-bridge-way-common";

export = (dependencies: IDependenciesData) => {
 const {
  editUser,
  updatePassword,
  updateEmail,
  addUserSkills,
  removeSkill,
  updateUserAbout,
  addUserSocialLinks,
  removeUserSocialLinks,
  getAllJobs,
  getJobDetailsById,
 } = userController(dependencies);
 const router = express.Router();

 router.post("/edit-user", verifyToken, editUser);
 router.post("/update-password", verifyToken, updatePassword);
 router.post("/update-email", verifyToken, updateEmail);
 router.post("/add-skill", verifyToken, addUserSkills);
 router.post("/remove-skill", verifyToken, removeSkill);
 router.post("/update-about", verifyToken, updateUserAbout);
 router.post("/add-socialLinks", verifyToken, addUserSocialLinks);
 router.post("/remove-socialLinks", verifyToken, removeUserSocialLinks);
 router.get("/get-all-jobs", verifyToken, getAllJobs);
 router.get("/get-job-details/:id", verifyToken, getJobDetailsById);
 return router;
};
