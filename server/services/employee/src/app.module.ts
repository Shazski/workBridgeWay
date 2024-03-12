import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RabbitMqController } from './employee/infra/rabbitMq/rabbitmq.controller';
@Module({
  imports: [
    EmployeeModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/workBridgeWay-employee'),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
