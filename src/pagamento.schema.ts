import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Usuario } from './usuario.schema';


// @Schema() diz ao Nest que esta classe é um "molde" de banco de dados
@Schema()
export class Pagamento extends Document {
  // @Prop() define um campo (coluna) no banco
  @Prop({ required: true, unique: true })
  idPagamento: string;

  @Prop({ required: true })
  valorPagamento: number;

  @Prop({ required: true })
  dataPagamento: string;

  @Prop({ required: true })
  nomePagador: string;

  @Prop({ required: true })
  nomeRecebedor: string;

  @Prop({ default: 'EM PROCESSAMENTO' })
  status: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Usuario' })
  usuario: Types.ObjectId; // Vai guardar o _id (ID do Mongo) do usuário
}

//  SchemaFactory cria o Schema a partir da classe Pagamento
export const PagamentoSchema = SchemaFactory.createForClass(Pagamento);