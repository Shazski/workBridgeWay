import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { connect, Channel, Connection, ConsumeMessage } from 'amqplib';
import { EventEmitter } from 'events';

@Injectable()
export class RabbitMQService {
  private connection: Connection;
  private channel: Channel;
  private eventEmitter: EventEmitter = new EventEmitter();
  private replyToQueue: string;

  async initialize() {
    this.connection = await connect('amqp://localhost:5672');
    this.channel = await this.connection.createChannel();
    this.replyToQueue = `replyQueue_${uuidv4()}`;
    await this.channel.assertQueue(this.replyToQueue, { durable: false });
    this.listenToReplyQueue();
  }

  async sendMessage(
    queue: string,
    message: any,
    operation: string,
  ): Promise<any> {

    if (!this.connection) {
      await this.initialize();
    }

    const correlationId = uuidv4();

    const messageProperties = {
      correlationId: correlationId,
      replyTo: this.replyToQueue,
      headers: {
        function: operation, 
      },
    };

    const responsePromise = new Promise<any>((resolve) => {
      this.eventEmitter.once(correlationId, resolve);
    });
    await this.channel.sendToQueue(queue, Buffer.from(message), {
      ...messageProperties,
    });

    return responsePromise;
  }

  private listenToReplyQueue() {
    this.channel.consume(
      this.replyToQueue,
      (msg: ConsumeMessage | null) => {
        if (msg) {
          const correlationId = msg.properties.correlationId;
          this.eventEmitter.emit(
            correlationId,
            JSON.parse(msg.content.toString()),
          );
        }
      },
      { noAck: true },
    );
  }
}
