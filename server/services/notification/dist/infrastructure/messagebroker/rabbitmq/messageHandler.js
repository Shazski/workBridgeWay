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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InterviewScheduleMail_1 = __importDefault(require("../../../utils/nodemailer/InterviewScheduleMail"));
const notification_1 = require("../../firebase/notification");
const client_1 = __importDefault(require("./client"));
class MessageHandler {
    static handle(operation, data, correlationId, replyTo) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {};
            switch (operation) {
                case "sendNotifications":
                    console.log("🚀 ~ MessageHandler ~ data:", data);
                    const { fmcToken, title, body } = data;
                    response = (0, notification_1.sendChatNotification)(fmcToken, title, body);
                    break;
                case "sendInterviewScheduleEmail":
                    response = (0, InterviewScheduleMail_1.default)(data);
                    break;
                default:
                    response = "Request-key notfound";
                    break;
            }
            yield client_1.default.Responder(response, correlationId, replyTo);
        });
    }
}
exports.default = MessageHandler;
