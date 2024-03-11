import sendScheduleEmail from "../../../utils/nodemailer/InterviewScheduleMail";
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
    console.log("🚀 ~ MessageHandler ~ data:", data)
    const { fmcToken, title, body } = data;
    response = sendChatNotification(fmcToken, title, body);
    break;
   case "sendInterviewScheduleEmail":
    response = sendScheduleEmail(data);
    break;
   default:
    response = "Request-key notfound";
    break;
  }

  await rabbitMQClient.Responder(response, correlationId, replyTo);
 }
}
