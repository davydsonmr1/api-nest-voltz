import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';



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
}

//  SchemaFactory cria o Schema a partir da classe Pagamento
export const PagamentoSchema = SchemaFactory.createForClass(Pagamento);