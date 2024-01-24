import express from "express";
import { userController } from "../../presentation/controllers";

export = (dependencies: any) => {
  const { editUser } = userController(dependencies);
  const router = express.Router();
  router.post("/edit-user", editUser);
  return router;
};
