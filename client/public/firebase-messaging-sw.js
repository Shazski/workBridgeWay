importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: `AIzaSyCg5SEoAYIt7hpRxFmSxYW5z2mITvLzG9s`,
  authDomain: "workbridgeway-d9742.firebaseapp.com",
  projectId: "workbridgeway-d9742",
  storageBucket: "workbridgeway-d9742.appspot.com",
  messagingSenderId: "815961305013",
  appId: "1:815961305013:web:c28e71250c958a8ed133fc",
  measurementId: "G-LPY6751LKY"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});