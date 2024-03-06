import { config } from "dotenv";
config()

export const RABBITMQ_URL:string = String(process.env.RABBITMQ_URL)
