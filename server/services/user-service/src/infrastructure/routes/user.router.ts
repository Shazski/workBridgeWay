import express from "express";
import { userController } from "../../presentation/controllers";

export = (dependencies: any) => {
  const { apply } = userController(dependencies);
  const router = express.Router();
  router.post("/apply-job", apply);
  return router;
};
