import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Usuario extends Document {
 
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  nome: string;

  @Prop({ required: true, unique: true })
  cpf: string;

  @Prop({ required: true })
  senha: string;
}
export const UsuarioSchema = SchemaFactory.createForClass(Usuario);