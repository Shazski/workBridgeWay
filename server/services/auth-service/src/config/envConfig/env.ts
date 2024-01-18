import dotenv from "dotenv"

dotenv.config()

export const PORT = process.env.PORT
export const ENV = process.env.ENV
export const RABBITMQ_URL = process.env.RABBITMQ_URL
export const MAILER_PASSWORD = process.env.MAILER_PASSWORD
export const MAILER_EMAIL = process.env.MAILER_EMAIL
export const MONGO_URL = process.env.MONGO_URL