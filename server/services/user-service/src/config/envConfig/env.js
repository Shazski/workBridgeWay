"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.MAILER_EMAIL = exports.MAILER_PASSWORD = exports.MONGO_URL = exports.RABBITMQ_URL = exports.ENV = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT;
exports.ENV = process.env.ENV;
exports.RABBITMQ_URL = process.env.RABBITMQ_URL;
exports.MONGO_URL = process.env.MONGO_URL;
exports.MAILER_PASSWORD = process.env.MAILER_PASSWORD;
exports.MAILER_EMAIL = process.env.MAILER_EMAIL;
exports.JWT_SECRET = process.env.JWT_SECRET;
