import { DependenciesData } from "../../interfaces/IDependencies";

export const verifyOtp_useCase = (dependencies: DependenciesData) => {
  const {
    otpRepo: { verifyOtp },
  } = dependencies;
  try {
    const execute = async (email: string, otp: number) => {
      return await verifyOtp(email, otp);
    };
    return {
      execute,
    };
  } catch (error) {
    console.log("<< Something went wrong in verifyOtp useCase >>");
    return false;
  }
};
