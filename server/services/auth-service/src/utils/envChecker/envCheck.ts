import dotenv from "dotenv";
import { JWT_SECRET, PORT } from "../../config/index";
dotenv.config();

export class EnvironmentChecker {
  constructor() {}

  async check() {
    try {
      this.checkEnvVariable(`${PORT}`);
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
