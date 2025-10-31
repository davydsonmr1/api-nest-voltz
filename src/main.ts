// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// 1. Importe as ferramentas de microserviço
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 3. Diz ao Nest para TAMBÉM se conectar ao RabbitMQ como um "ouvinte"
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ, // Define o "transporte" como RabbitMQ
    options: {
      urls: ['amqp://localhost:5672'], // A URL do nosso Rabbit no Docker
      queue: 'fila_de_atualizacoes', // O NOME da fila que ele vai "vigiar"
      queueOptions: {
        durable: true, // Garante que a fila sobreviva se o Rabbit reiniciar
      },
    },
  });

  // 4. Inicia TODOS os microserviços
  await app.startAllMicroservices();
  
  // 5. Inicia a API Web 
  await app.listen(3000);
  console.log('API Web rodando em http://localhost:3000');
  console.log('RabbitMQ vigiando a "fila_de_atualizacoes"');
}
bootstrap();