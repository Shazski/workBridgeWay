import express from "express";
import { userController } from "../../presentation/controllers";
import { IDependenciesData } from "../../application/interfaces/IDependenciesData";
import { verifyUserToken } from "work-bridge-way-common";
import { checkUserBlockOrNot } from "../../middleware/checkUserBlockOrNot_middleware";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
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
  uploadResume,
  applyForJob,
  getUserApplications,
  setUserPreferredCategory,
 } = userController(dependencies);
 const router = express.Router();

 router.post("/edit-user", verifyUserToken, checkUserBlockOrNot, editUser);
 router.post(
  "/update-password",
  verifyUserToken,
  checkUserBlockOrNot,
  updatePassword
 );
 router.post(
  "/update-email",
  verifyUserToken,
  checkUserBlockOrNot,
  updateEmail
 );
 router.post("/add-skill", verifyUserToken, checkUserBlockOrNot, addUserSkills);
 router.post(
  "/remove-skill",
  verifyUserToken,
  checkUserBlockOrNot,
  removeSkill
 );
 router.post(
  "/update-about",
  verifyUserToken,
  checkUserBlockOrNot,
  updateUserAbout
 );
 router.post(
  "/add-socialLinks",
  verifyUserToken,
  checkUserBlockOrNot,
  addUserSocialLinks
 );
 router.post(
  "/remove-socialLinks",
  verifyUserToken,
  checkUserBlockOrNot,
  removeUserSocialLinks
 );
 router.get("/get-all-jobs", verifyUserToken, checkUserBlockOrNot, getAllJobs);
 router.get("/get-job-details/:id", getJobDetailsById);
 router.post(
  "/upload-resume",
  upload.single("pdfFile"),
  verifyUserToken,
  uploadResume
 );
 router.post(
  "/apply-for-job",
  verifyUserToken,
  checkUserBlockOrNot,
  applyForJob
 );
 router.get(
  "/get-user-applications",
  verifyUserToken,
  checkUserBlockOrNot,
  getUserApplications
 );
 router.post(
  "/set-preferred-category",
  verifyUserToken,
  checkUserBlockOrNot,
  setUserPreferredCategory
 );
 return router;
};
