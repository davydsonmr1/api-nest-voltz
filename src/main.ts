// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// 1. Importe as ferramentas de microserviço
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ, 
    options: {
      urls: ['amqp://localhost:5672'], 
      queue: 'fila_de_atualizacoes', 
      queueOptions: {
        durable: true, 
      },
    },
  });
  
  await app.startAllMicroservices();
  
  await app.listen(3000);
  console.log('API Web rodando em http://localhost:3000');
  console.log('RabbitMQ vigiando a "fila_de_atualizacoes"');
}
bootstrap();