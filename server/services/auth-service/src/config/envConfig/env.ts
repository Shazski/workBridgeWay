import dotenv from "dotenv"

dotenv.config()

export const PORT = process.env.PORT
export const ENV = process.env.ENV
export const RABBITMQ_URL = process.env.RABBITMQ_URL