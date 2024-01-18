import { ENV, PORT, RABBITMQ_URL, MAILER_EMAIL, MAILER_PASSWORD, MONGO_URL, JWT_SECRET } from "../../config/index";

export class EnvironmentChecker {
  constructor() {}

  async check() {
    try {
      this.checkEnvVariable(`${PORT}`);
      this.checkEnvVariable(`${ENV}`);
      this.checkEnvVariable(`${RABBITMQ_URL}`);
      this.checkEnvVariable(`${MAILER_EMAIL}`);
      this.checkEnvVariable(`${MAILER_PASSWORD}`);
      this.checkEnvVariable(`${MONGO_URL}`);
      this.checkEnvVariable(`${JWT_SECRET}`);
    } catch (error) {}
  }

  private checkEnvVariable(variable: string) {
    if (!variable) {
      console.log(`${variable} must be defined`);
      throw new Error(`Environment Variable ${variable} is not defined`);
    }
  }
}
