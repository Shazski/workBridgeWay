"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const sendScheduleEmail = (data) => {
    const transporter = nodemailer_1.default.createTransport({
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
        transporter.sendMail(mailDetails, (error, info) => {
            if (error) {
                console.log("error happened in nodemailer" + error);
                reject(false);
            }
            else {
                console.log("Email sent successfully");
                resolve(true);
            }
        });
    });
};
exports.default = sendScheduleEmail;
