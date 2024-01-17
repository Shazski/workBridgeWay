import express from "express";
import authRouter from "./auth.router";
export const routes = (dependencies: any) => {
  const routes = express.Router();

  routes.use("/auth", authRouter(dependencies));

  return routes;
};
