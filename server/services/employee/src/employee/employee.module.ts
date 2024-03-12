import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PasswordService } from './utils/bcrypt/bcrypt.service';
import {
  Employee,
  EmployeeSchema,
} from 'src/repository/schema/employee.schema';
import { RabbitMQService } from './infra/rabbitMq/rabbitmqProducer.service';
import { RabbitMqController } from './infra/rabbitMq/rabbitmq.controller';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
  controllers: [EmployeeController,RabbitMqController],
  providers: [EmployeeService, PasswordService, RabbitMQService],
})
export class EmployeeModule {}
