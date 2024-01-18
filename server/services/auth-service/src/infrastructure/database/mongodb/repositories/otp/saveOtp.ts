import otpSchema from "../../schema/otpSchema";

export const saveOtp = async (email: string, otp: number): Promise<void> => {
  try {
    await otpSchema.findOneAndUpdate(
      { email: email },
      { otp: otp },
      { upsert: true }
    );
  } catch (error) {
    console.log(error, "< Something went Wrong >")
  }
};
