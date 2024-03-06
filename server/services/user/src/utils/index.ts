import { EnvironmentCheck } from "./envChecker/envCheck";
import { corsOptions } from "./constants/constant";
import sendOtp from "./externalService/nodemailer/sentOtp";

export {
    EnvironmentCheck,
    corsOptions,
    sendOtp,
}