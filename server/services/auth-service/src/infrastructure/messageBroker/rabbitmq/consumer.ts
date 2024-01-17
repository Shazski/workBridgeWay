import { Channel, ConsumeMessage } from "amqplib";
import { EventEmitter } from "events";
import MessageHandler from "./messageHandler";

export default class Consumer {
  constructor(private channel: Channel | undefined) {}

  async consumeMessages(queue: string, eventEmitter?: EventEmitter) {
    if (eventEmitter) {
      console.log("ready to consume messages on auth service");
      this.channel?.consume(
        queue,
        (message: ConsumeMessage | null) => {
          if (message) {
            console.log(
              JSON.parse(message.content.toString()),
              message.properties.correlationId.toString()
            );
            eventEmitter.emit(
              message.properties.correlationId.toString(),
              message
            );
          }
        },
        { noAck: true }
      );
    } else {
      this.channel?.consume(
        queue,
        async (message: ConsumeMessage | null) => {
          if (!message) return;
          const { correlationId, replyTo } = message.properties;
          const operation = message.properties.headers.function;
          if (!correlationId || !replyTo) {
            console.log("Some properties are missing..");
          } else {
            MessageHandler.handle(operation, JSON.parse(message.content.toString()),correlationId, replyTo)
          }
        },
        {
          noAck: true,
        }
      );
    }
  }
}
