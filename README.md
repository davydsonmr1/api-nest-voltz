# API Simples de Pagamentos (NestJS, MongoDB, RabbitMQ)

Este é um projeto de desafio que implementa uma API de microsserviços para gerenciar usuários e pagamentos.

# O fluxo principal é:

Um Usuário é cadastrado.

Um Pagamento é criado e associado a esse usuário, com o status inicial "EM PROCESSAMENTO".

Um consumer do RabbitMQ (fila) recebe uma mensagem assíncrona para atualizar o status desse pagamento (ex: para "APROVADO" ou "RECUSADO").

# Como eu entendi, como eu fiz e dificuldades que encontrei.

O NestJS nos força a organizar o código em "caixas", o que torna o projeto mais fácil de organizar e manter, mas achei mais dificil de entender:

main.ts: É o arquivo que "liga" a aplicação. Ele inicia o servidor webe também conecta o consumer do RabbitMQ.

app.module.ts: É o "mapa" principal do projeto. Ele registra quais "ferramentas" (como a conexão com o MongoDB) e quais "peças" (Controllers e Services) a aplicação vai usar.

*.schema.ts: Define a "forma" dos nossos dados no MongoDB (ex: o que um Usuario tem, o que um Pagamento tem).

app.controller.ts: Define os endpoints que o cliente pode acessar. Ele é que recebe os pedidos e as mensagens. Ele só recebe e delega para o Service.

app.service.ts: Contém toda a lógica de negócio. é o que faz realmente funcionar 

# Como testar : 

Usuários:

POST /api/usuarios: Cadastra um novo usuário (nome, email, cpf).

GET /api/usuarios: Lista todos os usuários cadastrados.

Pagamentos:

POST /api/usuarios/:idUsuario/pagamentos: Cria um novo pagamento associado a um usuário.

GET /api/pagamentos/:idPagamento: Verifica o status e os dados de um pagamento específico.

Processamento Assíncrono:

Um consumer na fila fila_de_atualizacoes do RabbitMQ.

Atualiza o status de um pagamento no MongoDB quando uma mensagem é recebida.

