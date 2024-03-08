import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1/');
  
  app.enableCors()
  
  app.useGlobalPipes(new ValidationPipe())
  
  await app.listen(3003);

  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://127.0.0.1:5672'],
        queue: 'employee_queue',
        queueOptions: {
          durable: false,
        },
      },
    });

  await microservice.listen();
}
bootstrap();
