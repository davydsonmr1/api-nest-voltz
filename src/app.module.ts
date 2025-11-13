// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pagamento, PagamentoSchema } from './pagamento.schema';
import { Usuario, UsuarioSchema } from './usuario.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    //  MongoDB (mesma URL local)
    MongooseModule.forRoot('mongodb://localhost:27017/pagamentos_db_nest'),
    MongooseModule.forFeature([
      { name: Usuario.name, schema: UsuarioSchema },
      { name: Pagamento.name, schema: PagamentoSchema },
    ]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET_KEY, 
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}