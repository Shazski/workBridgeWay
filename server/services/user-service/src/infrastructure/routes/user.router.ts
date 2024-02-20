import express from "express";
import { userController } from "../../presentation/controllers";
import { IDependenciesData } from "../../application/interfaces/IDependenciesData";

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
  } = userController(dependencies);
  const router = express.Router();
  
  router.post("/edit-user", editUser);
  router.post("/update-password", updatePassword);
  router.post("/update-email", updateEmail);
  router.post("/add-skill", addUserSkills);
  router.post("/remove-skill", removeSkill);
  router.post("/update-about", updateUserAbout);
  router.post("/add-socialLinks", addUserSocialLinks);
  router.post("/remove-socialLinks", removeUserSocialLinks);
  router.get('/get-all-jobs',getAllJobs);
  return router;
};
