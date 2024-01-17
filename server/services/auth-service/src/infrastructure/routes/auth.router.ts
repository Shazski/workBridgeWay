import express from "express";
import { authController } from "../../presentation/controllers";
export = (dependencies: any) => {
  const router = express.Router();
  const { signUpUser } = authController(dependencies);
  router.post("/sign-up", signUpUser);
  return router;
};
