"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../../../config");
const sendOtp = (email, otp) => {
    console.log(email);
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: config_1.MAILER_EMAIL,
            pass: config_1.MAILER_PASSWORD,
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
        transporter.sendMail(mailDetails, (error, info) => {
            if (error) {
                console.log('error happened in nodemailer' + error);
                reject(false);
            }
            else {
                console.log('Email sent successfully');
                resolve(true);
            }
        });
    });
};
exports.default = sendOtp;
