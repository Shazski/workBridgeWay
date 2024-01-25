import otpSchema from "../../schema/otpSchema";

export const saveOtp = async (email: string, otp: number): Promise<boolean> => {
  try {
    await otpSchema.findOneAndUpdate(
      { email: email },
      { otp: otp },
      { upsert: true }
    );
    return true
  } catch (error) {
    console.log(error, "< Something went Wrong >")
    return false
  }
};
