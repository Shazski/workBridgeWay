import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeDto } from './dto/employeeDto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService:EmployeeService) {}

  @Post('/add-employee')
  addEmployee(@Body() employeeData:EmployeeDto) {

  }
}
