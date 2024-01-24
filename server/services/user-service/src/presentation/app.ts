import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { corsOptions } from "../utils";
import { errorHandler } from "../utils";
import routes from "../infrastructure/routes";
import dependencies from "../utils/config/dependencies";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/api/v1", routes(dependencies));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ success: false, status: 400, message: "Not Found" });
});

app.use(errorHandler);

export { app };
