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
            case 'companyExists':
                response = await companyRepo.findCompanyByEmail(data)
                break;
            case 'getAllCompany':
                response = await companyRepo.getAllCompanyData_repo()
                break;
            case 'updateRequest':
                response = await companyRepo.updateRequest(data)
                break;
            default:
                response = 'Request-key notfound'
                break;
        }

        await rabbitMQClient.Responder(response, correlationId, replyTo)
    }
}