import express, { Request, Response } from "express";
import dotenv from "dotenv";
import http from 'http'
import cors from "cors";
import { corsOptions } from "../utils";
import {errorHandler} from "work-bridge-way-common"
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { routes } from "../infrastructure/router";
import { dependencies } from "../utils/config/dependencies";
import { PORT } from "../config";
import connectSocketIo from "../infrastructure/socket.io/connection";

dotenv.config();

export const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/api/v1", routes(dependencies));

app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, status: 404, message: "Api Not found" });
});

const server = http.createServer(app)

server.listen( PORT, () => {
  console.log(`chat service running at port ${PORT}`);
})

connectSocketIo(server)

app.use(errorHandler);
