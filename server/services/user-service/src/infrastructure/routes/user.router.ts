import express from "express";
import { userController } from "../../presentation/controllers";

export = (dependencies: any) => {
  const { editUser, updatePassword, updateEmail, addUserSkills, removeSkill, updateUserAbout } = userController(dependencies);
  const router = express.Router();
  router.post("/edit-user", editUser);
  router.post("/update-password", updatePassword);
  router.post('/update-email', updateEmail)
  router.post('/add-skill', addUserSkills)
  router.post('/remove-skill', removeSkill)
  router.post('/update-about', updateUserAbout)
  return router;
};
