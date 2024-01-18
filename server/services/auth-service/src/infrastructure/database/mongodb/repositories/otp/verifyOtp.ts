import otpSchema from "../../schema/otpSchema"

export const verifyOtp = async (email: string, otp:number): Promise<boolean> => {
    try {
        const verified = await otpSchema.findOne({email:email,otp:otp}) 
        if(!verified) return false
        return true
    } catch (error) {
        console.log(error, "< Something Went wrong >")
        return false
    }
}