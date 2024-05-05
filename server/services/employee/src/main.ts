import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.setGlobalPrefix('api/v1/');

  app.enableCors({
    origin: 'https://workbridgeway.webhobecoshop.shop',
    credentials: true,
  });
  
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3003);

  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://zyppsoza:hej41p9ErgF0o1rT1VV-zd8gN_Gk0s5e@fly.rmq.cloudamqp.com/zyppsoza'],
        queue: 'employee_queue',
        queueOptions: {
          durable: false,
        },
      },
    });

  await microservice.listen();
}
bootstrap();
