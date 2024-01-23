import {
  PORT,
  ENV,
  JWT_SECRET,
  MAILER_EMAIL,
  MAILER_PASSWORD,
  MONGO_URL,
  RABBITMQ_URL,
} from "../../config";

export class EnvironmentCheck {
  constructor() {}

  async checkEnv() {
    this.checkEnvVariable(`${PORT}`);
    this.checkEnvVariable(`${ENV}`);
    this.checkEnvVariable(`${JWT_SECRET}`);
    this.checkEnvVariable(`${MAILER_EMAIL}`);
    this.checkEnvVariable(`${MAILER_PASSWORD}`);
    this.checkEnvVariable(`${MONGO_URL}`);
    this.checkEnvVariable(`${RABBITMQ_URL}`);
  }

  private checkEnvVariable(variable: string) {
    if (!variable) {
      console.log(`Environment variable is not defined: ${variable}`);
      throw new Error(`Environment variable is not defined: ${variable}`);
    }
  }
}
