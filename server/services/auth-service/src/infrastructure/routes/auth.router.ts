import express from "express";
import { authController } from "../../presentation/controllers";
import { DependenciesData } from "../../application/interfaces/IDependencies";
export = (dependencies: DependenciesData) => {
  const router = express.Router();

  const { signUpUser, logoutUser, googleAuth } = authController(dependencies);
  router.post("/sign-up", signUpUser);
  router.get("/logout", logoutUser);
  router.post('/google', googleAuth)

  return router;
};
