import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeDto } from './dto/employeeDto';
import { PasswordService } from './utils/bcrypt/bcrypt.service';

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly passwordService: PasswordService,
  ) {}

  @Post('/add-employee')
  async addEmployee(@Body() employeeData: EmployeeDto) {
    employeeData.password = await this.passwordService.hashPassword(
      employeeData.password,
    );
    const newEmployee = await this.employeeService.addEmployee(employeeData);
    console.log(newEmployee, "EmployeeData");
  }
}
