import nodemailer from "nodemailer"
import { MAILER_EMAIL, MAILER_PASSWORD } from "../../../config";
const sendOtp = (email: string, otp: number) => {
    console.log(email);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: MAILER_EMAIL,
        pass: MAILER_PASSWORD,
      },
    });

    const mailDetails = {
      from: process.env.MY_EMAIL,
      to: email,
      subject: "OTP",
      html: `<h6> This is an otp from workBridgeWay for your recent signUp  </h6>
            <h1>${otp}</h1>
            <h4>! Reminder this otp is only valid for 5 mins duration</h4>
            <h3>Thank You for Choosing Us</h3>`
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailDetails, ( error: any, info: any) => {
          if (error) {
              console.log('error happened in nodemailer'+error);
              reject(false)
          } else {
              console.log('Email sent successfully');
              resolve(true)
          }
        });
    })
}

export default sendOtp;