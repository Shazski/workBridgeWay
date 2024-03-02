import { userRepo } from '../../database/mongodb/repositories';
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
            case 'userExist':
                response = await userRepo.findUserByEmail_repo(data)
                break;
            case 'userSignUp':
                response = await userRepo.SignUpUser_repo(data)
                break;
            case 'getUserById':
                response = await userRepo.findUserById_repo(data)
                break;
            default:
                response = 'Request-key notfound'
                break;
        }

        await rabbitMQClient.Responder(response, correlationId, replyTo)
    }
}