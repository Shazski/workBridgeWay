import { saveOtp } from '../../database/mongodb/repositories/otp/saveOtp';
import { verifyOtp } from '../../database/mongodb/repositories/otp/verifyOtp';
import rabbitMQClient from './client'

export default class MessageHandler {
    static async handle(
        operation: string,
        data: any,
        correlationId: string,
        replyTo: string
    ) {
        let response = {}
        console.log('the operation is', operation);
        console.log('the data is', data);
        switch (operation) {
            case 'saveOtp':
                response = await saveOtp(data.email,data.otp)
                break;
            case 'verifyOtp':
                response = await verifyOtp(data.email,data.otp)
                break;
            default:
                response = 'Request-key notfound'
                break;
        }

        await rabbitMQClient.Responder(response, correlationId, replyTo)
    }
}