import { DependenciesData } from "../../interfaces/IDependencies";

export const verifyOtp_useCase = (dependencies: DependenciesData) => {
  const {
    otpRepo: { verifyOtp },
  } = dependencies;

  const execute = async(email: string, otp: number) => {
    return await verifyOtp(email, otp)
  };
  return {
    execute,
  };
};
