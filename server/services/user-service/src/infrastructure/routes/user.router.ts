import express from "express";
import { userController } from "../../presentation/controllers";

export = (dependencies: any) => {
  const { editUser, updatePassword } = userController(dependencies);
  const router = express.Router();
  router.post("/edit-user", editUser);
  router.post("/update-password", updatePassword);
  return router;
};
