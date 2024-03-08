import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [EmployeeModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/workBridgeWay-employee')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
