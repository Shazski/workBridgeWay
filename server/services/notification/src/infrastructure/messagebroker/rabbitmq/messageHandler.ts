import { sendChatNotification } from "../../firebase/notification";
import rabbitMQClient from "./client";
export default class MessageHandler {
 static async handle(
  operation: string,
  data: any,
  correlationId: string,
  replyTo: string
 ) {
  let response = {};
  switch (operation) {
   case "sendNotifications":
    const { fmcToken, title, body } = data;
    response = sendChatNotification(fmcToken, title, body);
    break;
   default:
    response = "Request-key notfound";
    break;
  }

  await rabbitMQClient.Responder(response, correlationId, replyTo);
 }
}
