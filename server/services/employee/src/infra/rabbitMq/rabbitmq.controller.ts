import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { EmployeeService } from 'src/employee/employee.service';
import { ChannelWrapper } from 'amqp-connection-manager';
import { PasswordService } from 'src/employee/utils/bcrypt/bcrypt.service';

@Controller()
export class RabbitMqController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly passwordService: PasswordService,
  ) {}

  @MessagePattern()
  async handleEmployeeQueueData(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ): Promise<any> {
    const channel: ChannelWrapper = context.getChannelRef();
    const message = context.getMessage();

    const correlationId = message?.properties.correlationId;
    const replyToQueue = message.properties.replyToQueue;

    const operation = message.properties?.headers?.function;
    let response = {};

    switch (operation) {
      case 'addEmployee':
        data.password = this.passwordService.hashPassword(data.password);
        response = await this.employeeService.addEmployee(data);
        break;
      default:
        response = 'Request_key Not_Found';
        break;
    }

    if (replyToQueue && correlationId) {
      channel.sendToQueue(replyToQueue, Buffer.from(JSON.stringify(response)), {
        correlationId: correlationId,
      } as any);
    }
  }
}
