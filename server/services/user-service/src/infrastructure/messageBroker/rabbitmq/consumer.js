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
const messageHandler_1 = __importDefault(require("./messageHandler"));
class Consumer {
    constructor(channel) {
        this.channel = channel;
    }
    consumeMessages(queue, eventEmitter) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (eventEmitter) {
                console.log("ready to consume messages on user service");
                (_a = this.channel) === null || _a === void 0 ? void 0 : _a.consume(queue, (message) => {
                    if (message) {
                        console.log(JSON.parse(message.content.toString()), message.properties.correlationId.toString());
                        eventEmitter.emit(message.properties.correlationId.toString(), message);
                    }
                }, { noAck: true });
            }
            else {
                (_b = this.channel) === null || _b === void 0 ? void 0 : _b.consume(queue, (message) => __awaiter(this, void 0, void 0, function* () {
                    if (!message)
                        return;
                    const { correlationId, replyTo } = message.properties;
                    const operation = message.properties.headers.function;
                    if (!correlationId || !replyTo) {
                        console.log("Some properties are missing..");
                    }
                    else {
                        messageHandler_1.default.handle(operation, JSON.parse(message.content.toString()), correlationId, replyTo);
                    }
                }), {
                    noAck: true,
                });
            }
        });
    }
}
exports.default = Consumer;
