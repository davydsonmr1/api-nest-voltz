import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pagamento } from './pagamento.schema';
import { Usuario } from './usuario.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Pagamento.name)
    private readonly pagamentoModelo: Model<Pagamento>,

    @InjectModel(Usuario.name)
    private readonly usuarioModelo: Model<Usuario>,
  ) {}

  getHello(): string {
    return 'API de Pagamentos em NestJS está no ar!';
  }

   // Função de criar o usuario (copiei a logica de criar pagamento)
  async criarUsuario(dadosDoUsuario: any): Promise<Usuario> {
    console.log('Recebido no Service para salvar usuario:', dadosDoUsuario);
    // Cria uma nova instância do modelo com os dados
    const novoUsuario = new this.usuarioModelo(dadosDoUsuario);
    return novoUsuario.save();
  }

  async listarUsuarios(): Promise<Usuario[]> {
    console.log('[SERVICE] Listando todos os usuários');
    // .find() sem nada dentro significa "ache todos"
    return this.usuarioModelo.find();
  }

  async criarPagamento(dadosDoPagamento: any, idDoUsuario: string): Promise<Pagamento> {
  console.log(`[SERVICE] Criando pagamento para o usuário: ${idDoUsuario}`);
  const dadosCompletos = {
    ...dadosDoPagamento,  // Pega tudo do JSON (valor, idPagamento, etc)
    usuario: idDoUsuario 
  };

  const novoPagamento = new this.pagamentoModelo(dadosCompletos);
  return novoPagamento.save();
}

  async atualizarStatus(idPagamento: string, novoStatus: string) {
    console.log(`[SERVICE] Recebido pedido para atualizar ${idPagamento} para ${novoStatus}`);

    // Acha o pagamento pelo 'idPagamento' e atualiza o campo 'status'
    const pagamentoAtualizado = await this.pagamentoModelo.findOneAndUpdate(
      { idPagamento: idPagamento },      // Acha quem tem esse ID
      { $set: { status: novoStatus } }, // Define o novo status
      { new: true },                    // Retorna o documento já atualizado
    );
      console.log(pagamentoAtualizado);
    if (pagamentoAtualizado) {
      console.log('[SERVICE] Pagamento atualizado no banco!');
    } else {
      console.warn('[SERVICE] Pagamento não encontrado para atualizar.');
    }

    return pagamentoAtualizado;
  }
  
  // Lógica para buscar um pagamento pelo ID
  async buscarUmPagamento(idPagamento: string) {
    console.log(`[SERVICE] Buscando pagamento ${idPagamento}`);
    return this.pagamentoModelo.findOne({ idPagamento: idPagamento });
  }
}