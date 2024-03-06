import { firebase } from ".";

export const sendChatNotification = async (
 fmcToken: string,
 title: string,
 body: string
) => {
 let message = {
  token: fmcToken.toString(),
  notification: {
   title: title,
   body: body,
  },
 };

 try {
  const response = await firebase.messaging().send(message);
  console.info("wohooo .... firebase notification sent successfully", response);
 } catch (error) {
  console.error("Opps something went wrong in sending message", error);
 }
};
