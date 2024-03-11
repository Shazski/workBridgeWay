import { Controller, Get, Inject, Req } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Request } from 'express';
import { getUserById } from 'work-bridge-way-common';
import { ConfigService } from '@nestjs/config';
import { RabbitMQService } from './infra/rabbitMq/rabbitmqProducer.service';

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly configService: ConfigService,
    private readonly rabbitMQService: RabbitMQService
  ) {}

  @Get('/get-schedules')
  async getEmployeeSchedules(@Req() request: Request) {
    const token = request.cookies.auth_jwt;
    const secret = await this.configService.get('JWT_SECRET');
    const employeeId = getUserById(token, secret);
   await this.rabbitMQService.initialize()
   await this.rabbitMQService.sendMessage("user_queue","hello iam sharoon from employee service")
   console.log("success in data transform")
  }
}
