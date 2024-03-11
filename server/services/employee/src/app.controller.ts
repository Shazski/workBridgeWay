import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { EmployeeService } from './employee/employee.service';
import { Request } from 'express';
import { getUserById } from 'work-bridge-way-common';

@Controller('employee')
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

}
