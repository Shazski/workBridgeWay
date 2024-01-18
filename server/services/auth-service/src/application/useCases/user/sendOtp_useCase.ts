import sendOtp from "../../../utils/externalServices/nodemailer/sentOtp";
import { DependenciesData } from "../../interfaces/IDependencies";

export const sendOtp_useCase = (dependencies: DependenciesData) => {
  const {
    otpRepo: { saveOtp },
  } = dependencies;
  const execute = (email: string, otp: number) => {
    try {
      const success = sendOtp(email, otp);

      if (!success) return false;

      const otpStored = saveOtp(email, otp);

      if (!otpStored) return false;

      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    execute,
  };
};
