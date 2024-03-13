import { Module } from '@nestjs/common';
import { CronjobService } from './cronjob.service';
import { EmployeeService } from 'src/employee/employee.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from 'src/repository/schema/employee.schema';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
    ScheduleModule.forRoot()
  ],
  providers: [CronjobService,EmployeeService]
})
export class CronjobModule {}
