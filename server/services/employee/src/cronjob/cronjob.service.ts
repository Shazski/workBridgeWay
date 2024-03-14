import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model, Document } from 'mongoose';
import {
  Employee,
  EmployeeDocument,
} from 'src/repository/schema/employee.schema';

@Injectable()
export class CronjobService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {}

  @Cron('0 17 * * *', { name: 'checkAndSetAttendance' })
  async checkAndSetAttendance() {
    console.log('cron job running');
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const employees = await this.employeeModel.find();

    for (const employee of employees) {
      const typedEmployee = employee as EmployeeDocument & Document;

      const attendanceForToday = typedEmployee?.attendance.find(
        (entry) =>
          entry.date instanceof Date &&
          entry.date.toISOString().split('T')[0] === today.toISOString().split('T')[0],
      );

      if (!attendanceForToday) {
        typedEmployee?.attendance.push({
          checkIn: '00:00',
          checkOut: '00:00',
          date: today,
          status: 'Absent',
        });

        await typedEmployee.save();
      }
    }
  }
}
