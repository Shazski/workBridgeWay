import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { corsOptions } from "../utils";
import { errorHandler } from "../utils";
import { routes } from "../infrastructure/routes";
import { dependencies } from "../utils/index" 
import cookieParser from "cookie-parser";

dotenv.config();

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser())

app.use("/api/v1", routes(dependencies));

app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, status: 404, message: "Not found" });
});

app.use(errorHandler);
