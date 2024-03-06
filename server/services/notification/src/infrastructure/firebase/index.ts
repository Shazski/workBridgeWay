import firebase from "firebase-admin";

interface CustomServiceAccount {
 project_id: string;
 private_key_id: string;
 private_key: string;
 client_email: string;
 client_id: string;
 auth_uri: string;
 token_uri: string;
 auth_provider_x509_cert_url: string;
 client_x509_cert_url: string;
 universe_domain: string;
}

const serviceAccount: CustomServiceAccount = {
 project_id: "workbridgeway-d9742",
 private_key_id: "aa2fa32ea7bb68ba1ea9d71a88c01ddbf3959f8e",
 private_key:
  "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDQnf3ePWzAOP28\n9lkrHKQeHbFwm4H4YV7QUji37lczRlidL9uLw0Aycf8deJjelLnVI6laGQM/MEGU\nl1a3xA1EfQLLDXwzTLfUEwhmUdzlILLHYVSDubHE0EupmuWEBCNJEoQ9tqt4W98G\nJCNb+//5MlmZYVWVRvpSaQHjaFn1CFODD5B/XxDP4Oh5Sj8qdGCdZa0UBAq+hEaS\nEj4PUM8IgYjRZvSzCC8svZe9whLZS3QqQTho2IqJIpaakXcBbY6YJXaxf54/2Fdd\n+CRYbw0Ldsa9NuJFj3TSZd7XwG/Bq3Yhg/zI9XbgJcSBJ5i3wPwwoqPg+DGCriF/\n/9VFGIlzAgMBAAECggEAFMU2KnNZKYZDFRY96IHwgSMZsIl7FjyzkPAuv3lWaz98\nwSGrrS2ibaNV8Bw6tCaAngzv5o2I+jiWvvGWa7N0UrZTmd3c2MqxnsbKVk2ePZ3U\nzu8M2BSb82l9rwRCB7PVw4e5bN+MEO6stNLSRm0/nhL6QsAjIjqv35ae3oJcOn4M\nho8blOU5ELjRChVpD0sbgF5GkfWilXiXrAli5w0l4DrciQWcE/vUzQpn+q3QdxhN\nH41vHeaXneZ1bb88NwBfVJEkhecYSuLz5i+EHYcfQwMPx1jwb0H5ckhEmuU4mzdp\nHfkeXDkNB9v2/1Px8/1tB3+zRJ6BLtzSb0NE+ER9GQKBgQD8yI340ILdfuvCs5fR\n/WRifNzNsv4OBuzEvNlwNG9Bh+UoARc3+iiKiy38Ab+Y8POP5eGJbuJ5CXnF7aWO\nw1Qx/VuBcwSvOnaHhrQ7tsAYXwY6Uee5ASL27UWzA2cJ1x5M700aicQHG2fHlQz6\nqihuGA4gkiQUzGXJsrJRAbmN5wKBgQDTRZCdDtVgFYXt6EiRepTssEu1qhGKMJTp\ngL/ZVVPX6fa0En45qIRGtepG1E2ue/0svMymBJreb7A3p+msIJKAn6Kka7tO/Me/\n3glSKyYn8mFzpYsKV+grBfm6AY2jQrV656k8qsuJZERAWoKJVxrjgsHWRlLiUV+O\nw9vtCQ0+lQKBgEmMIKKQKENBtl7D2hxi2V4+bg/7UCfMo/7p42neF7C9VVM6XgMP\nadRFgm+cIp7hHDx16hUOih4lP6Ty7ASJmGmjCYi0alyBahMsgiwNk/6DR1CYnA8b\n4YxupKTdDJG0YUCJL6nVA4/9zUgoecpEz9aYcSPQ4WabwdHZiEBBfDdpAoGBAK16\nII2mIXTdF3TLV9ME2YYkGHaZp/9VduDpFB7r3oWbGjSwPq8vfTXmp/Dy4LpWGwQC\nHvRvMY9WHFcG7Gum70ToT4882re3/njAY9zxi0ofzv87vhiHKB8zr+OY5OlanFPI\nJwGmqKwvBY/mAeut92k689jzM5mcAZ/jmRFgblylAoGAZRNF6tYEgJjpm6OgVR0r\nUNqcgAaQraod00vJ+XWQXSAvIGgYPuEW6TSW8uSeMYEgGlEzm2Fpedp+job61Lbp\n6whRGa/OrpMjAqVVMrKTGn5JlqHVLNL+Le1J0tQ0pgFsLcHDyBifX5X0KV4SF0u5\nE1hZj5LITF+5Ed45yw1e/4M=\n-----END PRIVATE KEY-----\n",
 client_email:
  "firebase-adminsdk-buvvz@workbridgeway-d9742.iam.gserviceaccount.com",
 client_id: "115974909315770967878",
 auth_uri: "https://accounts.google.com/o/oauth2/auth",
 token_uri: "https://oauth2.googleapis.com/token",
 auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
 client_x509_cert_url:
  "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-buvvz%40workbridgeway-d9742.iam.gserviceaccount.com",
 universe_domain: "googleapis.com",
};

const serviceAccountJson = JSON.stringify(serviceAccount);

firebase.initializeApp({
 credential: firebase.credential.cert(JSON.parse(serviceAccountJson)),
});

export { firebase };
