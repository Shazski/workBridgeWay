import express from "express";
import authRouter from "./auth.router";
import { DependenciesData } from "../../application/interfaces/IDependencies";
export const routes = (dependencies: DependenciesData) => {
  const routes = express.Router();

  routes.use("/auth", authRouter(dependencies));

  return routes;
};
