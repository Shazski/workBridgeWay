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
        switch (operation) {
            case 'userExist':
                response = await userRepo.findUserByEmail_repo(data)
                break;
            case 'userSignUp':
                response = await userRepo.SignUpUser_repo(data)
                break;
            case 'getUserById':
                if(data)
                response = await userRepo.findUserById_repo(data)
                break;
            case 'getAllUsers':
                response = await userRepo.getAllUser()
                break;
            case 'getUserByIds':
                response = await userRepo.findUserByIds(data)
                break;
            default:
                response = 'Request-key notfound'
                break;
        }

        await rabbitMQClient.Responder(response, correlationId, replyTo)
    }
}