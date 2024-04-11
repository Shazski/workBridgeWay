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
    MongooseModule.forRoot(
      'mongodb+srv://sharoonkp:test123@cluster0.9aonsgn.mongodb.net/workbridgeway-employee?retryWrites=true&w=majority',
    ),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CronjobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
