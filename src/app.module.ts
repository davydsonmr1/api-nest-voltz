// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pagamento, PagamentoSchema } from './pagamento.schema';

@Module({
  imports: [
    //  MongoDB (mesma URL local)
    MongooseModule.forRoot('mongodb://localhost:27017/pagamentos_db_nest'),
    MongooseModule.forFeature([
      { name: Pagamento.name, schema: PagamentoSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}