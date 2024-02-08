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
const amqplib_1 = require("amqplib");
const rabbitmq_config_1 = __importDefault(require("./rabbitmq.config"));
const consumer_1 = __importDefault(require("./consumer"));
const producer_1 = __importDefault(require("./producer"));
const events_1 = require("events");
class RabbitMQClient {
    constructor() {
        this.isInitialized = false;
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new RabbitMQClient();
        }
        return this.instance;
    }
    initialize() {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isInitialized) {
                return;
            }
            try {
                if (rabbitmq_config_1.default.rabbitMq.url)
                    this.connection = yield (0, amqplib_1.connect)(rabbitmq_config_1.default.rabbitMq.url);
                this.eventEmitter = new events_1.EventEmitter();
                this.producerChannel = yield ((_a = this.connection) === null || _a === void 0 ? void 0 : _a.createChannel());
                this.consumerChannel = yield ((_b = this.connection) === null || _b === void 0 ? void 0 : _b.createChannel());
                const queueInfo = yield ((_c = this.consumerChannel) === null || _c === void 0 ? void 0 : _c.assertQueue(rabbitmq_config_1.default.rabbitMq.queues.user_queue, { exclusive: true }));
                const replyQueueInfo = yield ((_d = this.consumerChannel) === null || _d === void 0 ? void 0 : _d.assertQueue("", {
                    exclusive: true,
                }));
                // Use optional chaining to check if properties exist before accessing them
                const queue = queueInfo === null || queueInfo === void 0 ? void 0 : queueInfo.queue;
                const replyQueueName = replyQueueInfo === null || replyQueueInfo === void 0 ? void 0 : replyQueueInfo.queue;
                if (replyQueueName)
                    this.producer = new producer_1.default(this.producerChannel, replyQueueName, this.eventEmitter);
                this.consumer = new consumer_1.default(this.consumerChannel);
                if (queue)
                    this.consumer.consumeMessages(queue);
                if (replyQueueName)
                    this.consumer.consumeMessages(replyQueueName, this.eventEmitter);
                this.isInitialized = true;
            }
            catch (error) {
                console.error("** rabbitmq error...", error);
            }
        });
    }
    Requester(data, targetQueue, operation) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialized) {
                yield this.initialize();
            }
            return yield ((_a = this.producer) === null || _a === void 0 ? void 0 : _a.requestingProducer(data, targetQueue, operation));
        });
    }
    Responder(data, correlationId, replyToQueue) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialized) {
                yield this.initialize();
            }
            return yield ((_a = this.producer) === null || _a === void 0 ? void 0 : _a.respondingProducer(data, correlationId, replyToQueue));
        });
    }
}
exports.default = RabbitMQClient.getInstance();
