import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Employee,
  EmployeeSchema,
} from 'src/repository/schema/employee.schema';
import { PasswordService } from './utils/bcrypt/bcrypt.service';
import { RabbitMqController } from 'src/employee/infra/rabbitMq/rabbitmq.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
  controllers: [EmployeeController, RabbitMqController],
  providers: [EmployeeService, PasswordService],
})
export class EmployeeModule {}
