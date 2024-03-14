import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { corsOptions } from "../utils";
import {errorHandler} from "work-bridge-way-common"
import cookieParser from "cookie-parser";
import helmet from "helmet";

dotenv.config();

export const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));



app.use(errorHandler);
