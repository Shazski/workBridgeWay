import { Injectable, NotFoundException, Search } from '@nestjs/common';
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
    const editedEmployee = await this.EmployeeModal.findByIdAndUpdate(
      _id,
      {
        ...restValues,
      },
      { new: true },
    );

    if (!editedEmployee) return false;

    return editedEmployee;
  }

  async addCheckinForToday(employeeId: ObjectId) {
    try {
      const employee = await this.EmployeeModal.findById(employeeId);

      if (!employee) {
        throw new NotFoundException('Employee not found');
      }

      const today = new Date();
      const todayDateString = today.toISOString().split('T')[0];

      const todayAttendanceIndex = employee.attendance.findIndex(
        (entry) => entry.date.toISOString().split('T')[0] === todayDateString,
      );

      if (todayAttendanceIndex === -1) {
        const currentTime = today.toLocaleTimeString('en-US', {
          hour12: false,
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        });

        const status =
          currentTime > '09:05:00' ? 'Late Arrival' : employee?.workType;

        employee.attendance.push({
          checkIn: currentTime,
          checkOut: '', // Set initial checkout value if needed
          date: today,
          status: status,
        });

        await employee.save();
      }

      return employee;
    } catch (error) {
      console.error(error, '<< Something Went wrong in addCheckinForToday >>');
      return false;
    }
  }
}
