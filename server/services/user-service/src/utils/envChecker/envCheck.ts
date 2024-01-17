import { ENV, MONGO_URL, PORT, RABBITMQ_URL } from "../../config";

export class EnvironmentCheck {
  constructor() {}

  async check() {
    try {
      this.checkEnvVariable(`${ENV}`);
      this.checkEnvVariable(`${MONGO_URL}`);
      this.checkEnvVariable(`${PORT}`);
      this.checkEnvVariable(`${RABBITMQ_URL}`);
    } catch (error) {
        console.log(error)
    }
  }

  private checkEnvVariable(variable: string) {
    if (!variable) {
      console.log(`${variable} is not defined`);
      throw new Error(`Environment variable ${variable} is not defined`);
    }
  }
}
