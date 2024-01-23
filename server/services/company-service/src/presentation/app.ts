import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { corsOptions, dependencies, errorHandler } from "../utils";
import { ENV } from "../config";
import routes from "../infrastructure/routes";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
if (ENV === "dev") app.use(logger("dev"));

app.use("/api/v1", routes(dependencies));

app.use((req: Request, res: Response) => {
  res
    .status(404)
    .json({ success: false, status: 404, message: "Api Not found" });
});

app.use(errorHandler);

export default app
