import { RABBITMQ_URL } from "../../../config";

export default {
  rabbitMq: {
    url: RABBITMQ_URL,
    queues: {
      auth_queue: "auth_queue",
      user_queue: "user_queue",
      chat_queue: "chat_queue",
      company_queue: "company_queue",
      employee_queue: "employee_queue",
      notification_queue:"notification_queue"
    },
  },
};
