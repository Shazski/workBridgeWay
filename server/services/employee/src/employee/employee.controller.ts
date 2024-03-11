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
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  @Get('/get-schedules')
  async getEmployeeSchedules(@Req() request: Request) {
    const token = request.cookies.auth_jwt;
    const secret = await this.configService.get('JWT_SECRET');
    const employeeId = getUserById(token, secret);

    const data = await this.rabbitMQService.sendMessage(
      'company_queue',
      JSON.stringify({employeeId}),
      "getEmployeeScheduleData"
    );
    console.log('success in data transform', data);
  }
}
