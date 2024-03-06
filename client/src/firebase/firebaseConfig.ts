import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: `AIzaSyCg5SEoAYIt7hpRxFmSxYW5z2mITvLzG9s`,
  authDomain: "workbridgeway-d9742.firebaseapp.com",
  projectId: "workbridgeway-d9742",
  storageBucket: "workbridgeway-d9742.appspot.com",
  messagingSenderId: "815961305013",
  appId: "1:815961305013:web:c28e71250c958a8ed133fc",
  measurementId: "G-LPY6751LKY"
};

export const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app)


export const requestPermission = () => {
  console.log("Requesting for User Permission....");
  return Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification User Permission Granted");
      return getToken(messaging, {
        vapidKey:
          "BFX0R3EBMEdWrgAIOM0rALOgYfVj38K4IhcSPLOXJxOstGFsSI87I-lBQWyNWvk-6hgIPjvzTDBJSoQT37IGqbY",
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log(currentToken, "client FMC Token");
            return currentToken;
          } else {
            console.log("Failed to generate the app registration token");
            return null;
          }
        })
        .catch((err) => {
          console.log("An error occurred when requesting to receive the token", err);
          return null;
        });
    } else {
      console.log("User Permission Denied");
      return null;
    }
  });
};


requestPermission();

export const onMessageListener = () => {
 return new Promise<{ notification?: { title?: string; body?: string } }>(
  (resolve) => {
   onMessage(messaging, (payload: any) => {
    resolve(payload || {});
   });
  }
 );
};
