import { Channel } from "amqplib";
import { randomUUID } from "crypto";
import { EventEmitter } from "events";

export default class Producer {
    constructor(private channel: Channel | undefined, private replyQueueName: string, private eventEmitter: EventEmitter) { }

    async requestingProducer(data: any, targetQueue: string, operation: string) {
        try {
            const uuid = randomUUID()
            const isSuccess = this.channel?.sendToQueue(
                targetQueue,
                Buffer.from(JSON.stringify(data)),
                {
                    replyTo: this.replyQueueName,
                    correlationId: uuid,
                    headers: {
                        function: operation
                    }
                }
            )
            return new Promise((resolve, rejects) => {
                this.eventEmitter.once(uuid, (data) => {
                    const reply: any = JSON.parse(data.content.toString());
                    resolve(reply)
                })
            })
        } catch (err) {
            throw new Error("Error inside Auth producer")
        }
    }

    async respondingProducer(data: any, correlationId: string, replyToQueue: string) {
        this.channel?.sendToQueue(
            replyToQueue,
            Buffer.from(JSON.stringify(data)),
            {
                correlationId: correlationId
            }
        )
    }
}