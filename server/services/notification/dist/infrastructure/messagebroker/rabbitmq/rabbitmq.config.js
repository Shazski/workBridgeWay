"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../config");
exports.default = {
    rabbitMq: {
        url: config_1.RABBITMQ_URL,
        queues: {
            auth_queue: "auth_queue",
            user_queue: "user_queue",
            chat_queue: "chat_queue",
            company_queue: "company_queue",
            employee_queue: "employee_queue",
            notification_queue: "notification_queue",
        },
    },
};
