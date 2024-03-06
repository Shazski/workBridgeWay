"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendChatNotification = void 0;
const _1 = require(".");
const getFcmTokenById_1 = require("./getFcmTokenById");
const sendChatNotification = () => __awaiter(void 0, void 0, void 0, function* () {
    let message = {
        token: getFcmTokenById_1.fcmToken.toString(),
        notification: {
            title: "hello sharoon",
            body: "common dude lets have fun",
        },
    };
    try {
        const response = yield _1.firebase.messaging().send(message);
        console.info("wohooo .... firebase notification sent successfully", response);
    }
    catch (error) {
        console.error("Opps something went wrong in sending message", error);
    }
});
exports.sendChatNotification = sendChatNotification;
