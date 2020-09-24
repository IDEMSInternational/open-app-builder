import FIREBASE_CONFIG from "./firebaseConfig";

export const environment = {
  production: true,
  rapidPro: {
    receiveUrl:
      "https://rapidpro.idems.international/c/fcm/af89b1b8-e8b7-4e4b-b478-817849dd7982/receive",
    contactRegisterUrl:
      "https://rapidpro.idems.international/c/fcm/af89b1b8-e8b7-4e4b-b478-817849dd7982/register",
  },
  FIREBASE_CONFIG,
};
