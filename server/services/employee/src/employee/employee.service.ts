import { Injectable, Search } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Employee } from 'src/repository/schema/employee.schema';
import { EmployeeDto } from './dto/employeeDto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private EmployeeModal: Model<Employee>,
  ) {}

  async addEmployee(
    employeeDto: EmployeeDto,
  ): Promise<Employee | boolean | string | any> {
    try {
      const newEmployee = await this.EmployeeModal.create(employeeDto);
      if (!newEmployee) {
        return false;
      }
      return newEmployee;
    } catch (error) {
      if (error.code === 11000) {
        return { conflict: true, message: 'Email is Already Taken' };
      }
      console.log(error, '<< Something Went wrong in addEmployee Repo >>');
      return false;
    }
  }

  async getAllCompanyEmployees(data: {
    companyId: ObjectId;
    page: number;
    search: string;
  }) {
    const skip = Number((data.page - 1) * 10);
    const employeeList = await this.EmployeeModal.find({
      $or: [
        { name: { $regex: data.search } },
        { department: { $regex: data.search } },
      ],
      companyId: data.companyId,
    })
      .limit(10)
      .skip(skip);

    const employeeCount = await this.EmployeeModal.find({
      $or: [
        { name: { $regex: data.search } },
        { department: { $regex: data.search } },
      ],
      companyId: data.companyId,
    }).countDocuments();
    if (!employeeList) return false;

    return [employeeList, employeeCount];
  }

  async editEmployee(employeeDetails) {
    const { _id, ...restValues } = employeeDetails;
    const editedEmployee = await this.EmployeeModal.findByIdAndUpdate(_id, {
      ...restValues,
    },{new:true});

    if(!editedEmployee) return false

    return editedEmployee
  }
}
