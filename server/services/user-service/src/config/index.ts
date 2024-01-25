import { ENV, MONGO_URL, PORT, RABBITMQ_URL, MAILER_EMAIL, MAILER_PASSWORD } from "./envConfig/env";
import { connect } from "./database/connection";

export { ENV, MONGO_URL, PORT, RABBITMQ_URL, connect, MAILER_EMAIL, MAILER_PASSWORD };
