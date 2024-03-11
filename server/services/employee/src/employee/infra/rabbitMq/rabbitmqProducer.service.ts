import { Injectable } from '@nestjs/common';
import { connect, Channel, Connection } from 'amqplib';

@Injectable()
export class RabbitMQService {
  private connection: Connection;
  private channel: Channel;

  async initialize() {
    this.connection = await connect('amqp://localhost:5672');
    this.channel = await this.connection.createChannel();
  }

  async sendMessage(queue: string, message: string) {
    if (!this.connection) {
      await this.initialize();
    }

    this.channel.sendToQueue(queue, Buffer.from(message));
  }

  // Other methods...

  // async closeConnection() {
  //   if (this.connection) {
  //     await this.connection.close();
  //   }
  // }
}
