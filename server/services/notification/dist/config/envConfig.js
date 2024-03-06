"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RABBITMQ_URL = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.RABBITMQ_URL = String(process.env.RABBITMQ_URL);
