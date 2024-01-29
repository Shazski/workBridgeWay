import rabbitMQClient from './client'
import { companyRepo } from '../../database/mongodb/repositories';
export default class MessageHandler {
    static async handle(
        operation: string,
        data: any,
        correlationId: string,
        replyTo: string
    ) {
        let response = {}
        switch (operation) {
            case 'registerCompany':
                response = await companyRepo.registerCompany(data)
                break;
            default:
                response = 'Request-key notfound'
                break;
        }

        await rabbitMQClient.Responder(response, correlationId, replyTo)
    }
}