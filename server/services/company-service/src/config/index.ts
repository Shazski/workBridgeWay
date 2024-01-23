import {
  PORT,
  ENV,
  JWT_SECRET,
  MAILER_EMAIL,
  MAILER_PASSWORD,
  MONGO_URL,
  RABBITMQ_URL,
} from "./envConfig/env";

import { connect } from "./database/connection";

export {
  PORT,
  ENV,
  JWT_SECRET,
  MAILER_EMAIL,
  MAILER_PASSWORD,
  MONGO_URL,
  RABBITMQ_URL,
  connect,
};
