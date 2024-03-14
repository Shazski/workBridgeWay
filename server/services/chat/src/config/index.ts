import {
 ENV,
 MONGO_URL,
 PORT,
 RABBITMQ_URL,
 MAILER_EMAIL,
 MAILER_PASSWORD,
 JWT_SECRET,
 API_KEY,
 API_SECRET,
 CLOUD_NAME,
} from "./envConfig/env";
import { connect } from "./database/connection";

export {
 connect,
 ENV,
 MONGO_URL,
 PORT,
 RABBITMQ_URL,
 MAILER_EMAIL,
 MAILER_PASSWORD,
 JWT_SECRET,
 API_KEY,
 API_SECRET,
 CLOUD_NAME,
};
