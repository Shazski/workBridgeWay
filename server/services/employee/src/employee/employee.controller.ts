import { Controller, Get, Inject, Req, UnauthorizedException } from '@nestjs/common';
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
    if(!token || !secret) {
      throw new UnauthorizedException("Invalid token")
    }
    const employeeId = getUserById(token, secret);

    const data = await this.rabbitMQService.sendMessage(
      'company_queue',
      JSON.stringify({ employeeId }),
      'getEmployeeScheduleData',
    );
    if (!data) return false;

    return data;
  }

  @Get('/get-user-details')
  async getAllUserDetails() {
    const data = await this.rabbitMQService.sendMessage(
      'users_queue',
      JSON.stringify({ data: 'fetch data' }),
      'getAllUsers',
    );
    if (!data) return false;

    return data;
  }
}
