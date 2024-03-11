import nodemailer from "nodemailer";
import { config } from "dotenv";
config();
const sendScheduleEmail = (data: {
 email: string;
 body: string;
 title: string;
}) => {
 const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  service: "gmail",
  auth: {
   user: process.env.MAILER_EMAIL,
   pass: process.env.MAILER_PASSWORD,
  },
 });

 const mailDetails = {
  from: process.env.MY_EMAIL,
  to: data.email,
  subject: data.title,
  html: `<h2>${data.body}</h2>`,
 };

 return new Promise((resolve, reject) => {
  transporter.sendMail(mailDetails, (error: any, info: any) => {
   if (error) {
    console.log("error happened in nodemailer" + error);
    reject(false);
   } else {
    console.log("Email sent successfully");
    resolve(true);
   }
  });
 });
};

export default sendScheduleEmail;
