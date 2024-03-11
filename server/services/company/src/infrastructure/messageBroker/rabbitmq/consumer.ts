import { Channel, ConsumeMessage } from "amqplib";
import { EventEmitter } from "events";
import MessageHandler from "./messageHandler";

export default class Consumer {
 constructor(private channel: Channel | undefined) {}

 async consumeMessages(queue: string, eventEmitter?: EventEmitter) {
  if (eventEmitter) {
   console.log("ready to consume messages on company service");
   this.channel?.consume(
     queue,
     (message: ConsumeMessage | null) => {
       if (message) {
      eventEmitter.emit(message.properties.correlationId.toString(), message);
     }
    },
    { noAck: true }
   );
  } else {
   this.channel?.consume(
    queue,
    async (message: ConsumeMessage | null) => {
      console.log("Got message data in the cave successss====>>>>>",message?.content.toString());
     if (!message) return;
     const { correlationId, replyTo } = message.properties;
     const operation = message.properties.headers.function;
     if (!correlationId || !replyTo || !operation) {
      console.log("Some properties are missing..");
     } else {
      MessageHandler.handle(
       operation,
       JSON.parse(message.content.toString()),
       correlationId,
       replyTo
      );
     }
    },
    {
     noAck: true,
    }
   );
  }
 }
}
