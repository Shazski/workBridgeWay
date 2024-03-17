import express from "express";
import chatRouter from "./chat.router";
import { IDependencies } from "../../application/interfaces/IDependencies";
export const routes = (dependencies: IDependencies) => {
 const routes = express.Router();

 routes.use("/chat", chatRouter(dependencies));

 return routes;
};
