import express, { Request, Response } from "express";
import cors from "cors";
import logger from "morgan";
import { corsOptions, dependencies } from "../utils";
import { errorHandler } from "work-bridge-way-common";
import { ENV } from "../config";
import routes from "../infrastructure/routes";
import cookieParser from "cookie-parser"
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors(corsOptions));
if (ENV === "dev") app.use(logger("dev"));

app.use("/api/v1", routes(dependencies));

app.use((req: Request, res: Response) => {
  res
    .status(404)
    .json({ success: false, status: 404, message: "Api Not found" });
});

app.use(errorHandler);

export default app
