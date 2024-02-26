import express from "express";
import { userController } from "../../presentation/controllers";
import { IDependenciesData } from "../../application/interfaces/IDependenciesData";
import { verifyToken } from "work-bridge-way-common";
import { checkUserBlockOrNot } from "../../middleware/checkUserBlockOrNot_middleware";

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

 router.post("/edit-user", verifyToken, checkUserBlockOrNot,editUser);
 router.post("/update-password", verifyToken,checkUserBlockOrNot, updatePassword);
 router.post("/update-email", verifyToken,checkUserBlockOrNot, updateEmail);
 router.post("/add-skill", verifyToken, checkUserBlockOrNot,addUserSkills);
 router.post("/remove-skill", verifyToken,checkUserBlockOrNot, removeSkill);
 router.post("/update-about", verifyToken,checkUserBlockOrNot, updateUserAbout);
 router.post("/add-socialLinks", verifyToken,checkUserBlockOrNot, addUserSocialLinks);
 router.post("/remove-socialLinks", verifyToken,checkUserBlockOrNot, removeUserSocialLinks);
 router.get("/get-all-jobs", verifyToken,checkUserBlockOrNot, getAllJobs);
 router.get("/get-job-details/:id", verifyToken,checkUserBlockOrNot, getJobDetailsById);
 return router;
};
