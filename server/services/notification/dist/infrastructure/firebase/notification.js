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
const index_1 = require("./index");
const sendChatNotification = (fmcToken, title, body) => __awaiter(void 0, void 0, void 0, function* () {
    let message = {
        token: fmcToken.toString(),
        notification: {
            title: title,
            body: body,
        },
    };
    console.log(message, "message data");
    try {
        const response = yield index_1.firebase.messaging().send(message);
        console.info("wohooo .... firebase notification sent successfully", response);
    }
    catch (error) {
        console.error("Opps something went wrong in sending message", error);
    }
});
exports.sendChatNotification = sendChatNotification;
