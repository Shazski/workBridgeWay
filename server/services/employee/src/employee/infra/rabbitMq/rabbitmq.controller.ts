import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
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
    const replyToQueue = message.properties.replyTo;

    const operation = message.properties?.headers?.function;
    let response = {};

    switch (operation) {
      case 'addEmployee':
        data.password = await this.passwordService.hashPassword(data.password);
        response = await this.employeeService.addEmployee(data);
        break;
      case 'getAllCompanyEmployees':
        response = await this.employeeService.getAllCompanyEmployees(data);
        break;
      case 'editEmployee':
        response = await this.employeeService.editEmployee(data);
        break;
      case 'markCheckIn':
        console.log('🚀 ~ RabbitMqController ~ data:dadadada', data);
        response = await this.employeeService.addCheckinForToday(data);
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
