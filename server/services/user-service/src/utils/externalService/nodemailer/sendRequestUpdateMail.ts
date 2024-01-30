import nodemailer from "nodemailer"
import { MAILER_EMAIL, MAILER_PASSWORD } from "../../../config";
const sendRequestUpdationMail = (email: string, stage: string) => {
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
      subject: "Company request updation mail",
      html: `<h6> This mail is to share the information about your company registration request </h6>
            <h1>You have been${stage} bt the admin </h1>
            <h4>! Thank you for choosing Us</h4>`
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

export default sendRequestUpdationMail;