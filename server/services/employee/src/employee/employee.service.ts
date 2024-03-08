import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from 'src/repository/schema/employee.schema';
import { EmployeeDto } from './dto/employeeDto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private EmployeeModal: Model<Employee>,
  ) {}

  async addEmployee(
    employeeDto: EmployeeDto,
  ): Promise<Employee | boolean | string> {
    try {
      const newEmployee = await this.EmployeeModal.create(employeeDto);
      if (!newEmployee) {
        return false;
      }
      return newEmployee;
    } catch (error) {
      if (error.code === 11000) {
        console.log(error.message, 'error messages');
        return 'Employee Email Is Already Taken ';
      }
      console.log(error, '<< Something Went wrong in addEmployee Repo >>');
      return false;
    }
  }
}
