import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { corsOptions } from "../utils";
import {errorHandler} from "work-bridge-way-common"
import { routes } from "../infrastructure/routes";
import { dependencies } from "../utils/index" 
import cookieParser from "cookie-parser";
import helmet from "helmet";

dotenv.config();

export const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use("/api/v1", routes(dependencies));

app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, status: 404, message: "Api Not found" });
});

app.use(errorHandler);
