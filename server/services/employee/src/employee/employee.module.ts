// employee.module.ts
import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PasswordService } from './utils/bcrypt/bcrypt.service';
import {
  Employee,
  EmployeeSchema,
} from 'src/repository/schema/employee.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, PasswordService, Rabbit],
})
export class EmployeeModule {}
