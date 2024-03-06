import { firebase } from ".";
import { fcmToken } from "./getFcmTokenById";

export const sendChatNotification = async () => {
 let message = {
  token: fcmToken.toString(),
  notification: {
   title: "hello sharoon",
   body: "common dude lets have fun",
  },
 };

 try {
  const response = await firebase.messaging().send(message);
  console.info("wohooo .... firebase notification sent successfully", response);
 } catch (error) {
  console.error("Opps something went wrong in sending message", error);
 }
};
