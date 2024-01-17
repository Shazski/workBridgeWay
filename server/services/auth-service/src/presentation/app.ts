import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { corsOptions } from "../utils";
import { errorHandler } from "../utils";
dotenv.config();

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/api/v1", (req, res) => {
  res.send("its working");
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, status: 404, message: "Not found" });
});

app.use(errorHandler);

