import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CronjobModule } from './cronjob/cronjob.module';
@Module({
  imports: [
    EmployeeModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/workBridgeWay-employee'),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CronjobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
