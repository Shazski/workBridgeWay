import { ENV, PORT, RABBITMQ_URL } from "../../config/index";

export class EnvironmentChecker {
  constructor() {}

  async check() {
    try {
      this.checkEnvVariable(`${PORT}`);
      this.checkEnvVariable(`${ENV}`);
      this.checkEnvVariable(`${RABBITMQ_URL}`);
    } catch (error) {}
  }

  private checkEnvVariable(variable: string) {
    if (!variable) {
      console.log(`${variable} must be defined`);
      throw new Error(`Environment Variable ${variable} is not defined`);
    }
  }
}
