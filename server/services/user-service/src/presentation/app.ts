import express, { NextFunction, Request, Response } from "express";
import { ENV } from "../config";
import cors from "cors";
import { corsOptions } from "../utils";
import { errorHandler } from "work-bridge-way-common";
import routes from "../infrastructure/routes";
import dependencies from "../utils/config/dependencies";
import helmet from "helmet";
import logger from "morgan";
const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
if (ENV === "dev") app.use(logger("dev"));
app.use("/api/v1", routes(dependencies));

app.use((req: Request, res: Response, next: NextFunction) => {
  res
    .status(404)
    .json({ success: false, status: 404, message: "Url Not Found" });
});

app.use(errorHandler);

export { app };
