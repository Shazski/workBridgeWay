import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeDto } from './dto/employeeDto';
import { PasswordService } from './utils/bcrypt/bcrypt.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
}
