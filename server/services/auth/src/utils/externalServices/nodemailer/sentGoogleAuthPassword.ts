import nodemailer from "nodemailer"
import { MAILER_EMAIL, MAILER_PASSWORD } from "../../../config";
const sentGoogleAuthPasswordMail = (email: string, password: string) => {
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
      subject: "Password",
      html: `<h6> This is your password for your recent signUp on workBridgeWay</h6>
            <h1>${password}</h1>
            <h4>! Reminder try to change this password ASAP for security</h4>
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

export default sentGoogleAuthPasswordMail;