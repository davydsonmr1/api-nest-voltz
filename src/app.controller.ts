import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() 
  getHello(): string {
    return this.appService.getHello();
  }
@Post('usuarios/:idUsuario/pagamentos')
async criarPagamento(
  @Param('idUsuario') idUsuario: string,
  @Body() dados: any
) {
  console.log(`[CONTROLLER] Recebida requisição POST /usuarios/${idUsuario}/pagamentos`);
  return this.appService.criarPagamento(dados, idUsuario);
}

  @EventPattern() // Deixando em branco, ele pega tudo da fila principal
  async consumirAtualizacao(@Payload() mensagem: any) {
    console.log('--- MENSAGEM DO RABBITMQ RECEBIDA ---');
    console.log('[CONTROLLER] Mensagem:', mensagem);

    // 3. Pega os dados da mensagem
    const { idPagamento, novoStatus } = mensagem;
    // 4. Chama o Service 
    if (idPagamento && novoStatus) {
      await this.appService.atualizarStatus(idPagamento, novoStatus);
    } else {
      console.warn('[CONTROLLER] Mensagem recebida fora do padrão esperado.');
    }
  }

  //Verificar status: GET /api/pagamentos/id-do-pagamento
  @Get('pagamentos/:id')
  async verificarPagamento(@Param('id') id: string) {
    console.log(`[CONTROLLER] Recebida requisição GET para ${id}`);
    // Chama o Service
    return this.appService.buscarUmPagamento(id);
  }

  // Novo endpoint para criar usuário: POST /api/usuarios
  @Post('usuarios')
  async criarNovoUsuario(@Body() dados: any) {
    console.log('[CONTROLLER] Recebida requisição POST /usuarios');
    return this.appService.criarUsuario(dados);
  }

  //LISTAR todos os usuários
  @Get('usuarios')
  async verTodosUsuarios() {
    console.log('[CONTROLLER] Recebida requisição GET /usuarios');
    return this.appService.listarUsuarios();
  }

}

