# Sistema de Gestão de Vendas - E-commerce de Perfumes

## Descrição

Este projeto é um sistema de gestão de vendas de perfumes, desenvolvido com Node.js, Express e arquitetura MVC. Ele permite o cadastro, listagem, edição e exclusão de produtos e pedidos, além de integrar o front-end com a API REST.

A aplicação foi adaptada para atender à Atividade 3, com operações completas de CRUD, persistência em JSON e interface web para administração do catálogo e dos pedidos.

## Tema

Parfum féminin

## Tecnologias utilizadas

- Node.js
- Express
- JavaScript
- HTML5
- CSS3
- JSON
- Fetch API
- ViaCEP
- MVC
- Nodemon

## Estrutura do projeto

```text
Sistema-de-Gestao-de-Vendas/
├── data/
│   ├── pedidos.json
│   └── produtos.json
├── public/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── src/
│   ├── controllers/
│   │   ├── pedidoController.js
│   │   └── produtoController.js
│   ├── models/
│   │   ├── Pedido.js
│   │   ├── Perfume.js
│   │   └── Produto.js
│   ├── repositories/
│   │   └── jsonRepository.js
│   ├── routes/
│   │   ├── pedidoRoutes.js
│   │   └── produtoRoutes.js
│   └── services/
│       └── cepService.js
├── tests/
│   └── api-smoke.test.js
├── cli.js
├── package.json
├── README.md
├── server.js
└── .gitignore
```

## Como iniciar a aplicação

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor:

```bash
npm start
```

3. Acesse a aplicação no navegador:

```text
http://localhost:3000
```

4. Para rodar em modo de desenvolvimento com reinicialização automática:

```bash
npm run dev
```

## Endpoints da API

### Produtos

- GET /api/produtos - lista todos os produtos
- GET /api/produtos/:id - busca um produto por ID
- POST /api/produtos - cria um novo produto
- PUT /api/produtos/:id - atualiza um produto
- DELETE /api/produtos/:id - exclui um produto

### Pedidos

- GET /api/pedidos - lista todos os pedidos
- GET /api/pedidos/:id - busca um pedido por ID
- POST /api/pedidos - cria um novo pedido
- PUT /api/pedidos/:id - atualiza um pedido
- DELETE /api/pedidos/:id - exclui um pedido

## Exemplos de requisição

### Criar produto

```bash
curl -X POST http://localhost:3000/api/produtos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Good Girl",
    "preco": 499,
    "categoria": "Perfume feminino",
    "estoque": 12,
    "imagem": "https://example.com/imagem.jpg"
  }'
```

### Criar pedido

```bash
curl -X POST http://localhost:3000/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "cliente": "Maria Silva",
    "produtoId": 1,
    "quantidade": 2,
    "cep": "89000000",
    "status": "Pendente"
  }'
```

## Funcionalidades do sistema

- Cadastro de produtos e pedidos
- Listagem de registros em tempo real
- Edição e remoção dos dados
- Cálculo do valor total do pedido
- Controle de estoque
- Catálogo de perfumes
- Consulta de endereço via CEP
- Calculadora de desconto
- Front-end integrado com a API

## Observações

Os dados são persistidos em arquivos JSON na pasta data, simulando um banco de dados simples. A aplicação foi estruturada em MVC para separar responsabilidades, mantendo o código mais organizado e escalável.

## GitHub e entrega

O projeto pode ser armazenado em um repositório do GitHub ou exportado em .zip. Para apresentação, o vídeo solicitado deve demonstrar a evolução do sistema, o CRUD completo e a interação entre o front-end e a API.


## Como instalar

É necessário possuir o Node.js instalado.

Depois de baixar ou clonar o projeto, abra a pasta no Visual Studio Code.

Abra o terminal e execute:

npm install

## Como iniciar

Para executar utilizando Nodemon:

npm run dev

Ou utilizando Node normalmente:

npm start

Depois abra o navegador no endereço:

http://localhost:3000

## API

A API utiliza JSON para receber e enviar informações.

URL principal:

http://localhost:3000/api

# Endpoints de Produtos

## Listar todos os produtos

Método:

GET

Endpoint:

/api/produtos

Exemplo:

GET http://localhost:3000/api/produtos

Resposta:

[
  {
    "id": 1,
    "nome": "Too Scandal",
    "preco": 389,
    "categoria": "Perfume feminino",
    "estoque": 10
  }
]

## Buscar produto pelo ID

Método:

GET

Endpoint:

/api/produtos/:id

Exemplo:

GET http://localhost:3000/api/produtos/1

## Cadastrar produto

Método:

POST

Endpoint:

/api/produtos

Exemplo de JSON:

{
  "nome": "La Vie Est Belle",
  "preco": 550,
  "categoria": "Perfume feminino",
  "estoque": 5,
  "imagem": "https://exemplo.com/imagem.jpg"
}

## Atualizar produto

Método:

PUT

Endpoint:

/api/produtos/:id

Exemplo:

PUT http://localhost:3000/api/produtos/1

JSON:

{
  "nome": "Too Scandal",
  "preco": 399,
  "categoria": "Perfume feminino",
  "estoque": 15
}

## Excluir produto

Método:

DELETE

Endpoint:

/api/produtos/:id

Exemplo:

DELETE http://localhost:3000/api/produtos/1

# Endpoints de Pedidos

## Listar pedidos

Método:

GET

Endpoint:

/api/pedidos

## Buscar pedido

Método:

GET

Endpoint:

/api/pedidos/:id

## Cadastrar pedido

Método:

POST

Endpoint:

/api/pedidos

Exemplo de JSON:

{
  "cliente": "Maria Silva",
  "produto": "Good Girl",
  "quantidade": 2,
  "valorUnitario": 499,
  "status": "Pendente"
}

Resposta aproximada:

{
  "mensagem": "Pedido cadastrado com sucesso!",
  "pedido": {
    "id": 2,
    "cliente": "Maria Silva",
    "produto": "Good Girl",
    "quantidade": 2,
    "valorUnitario": 499,
    "total": 998,
    "status": "Pendente"
  }
}

## Atualizar pedido

Método:

PUT

Endpoint:

/api/pedidos/:id

Exemplo:

PUT http://localhost:3000/api/pedidos/1

JSON:

{
  "cliente": "Maria Silva",
  "produto": "Good Girl",
  "quantidade": 2,
  "valorUnitario": 499,
  "status": "Concluído"
}

## Excluir pedido

Método:

DELETE

Endpoint:

/api/pedidos/:id

Exemplo:

DELETE http://localhost:3000/api/pedidos/1

## Métodos HTTP utilizados

GET = consultar dados

POST = cadastrar novos dados

PUT = atualizar dados existentes

DELETE = excluir dados

## Persistência

Os dados são armazenados em arquivos JSON.

Produtos:

data/produtos.json

Pedidos:

data/pedidos.json

Dessa forma, os dados permanecem salvos mesmo depois que o servidor é encerrado.

## Integração Front-end e Back-end

O front-end utiliza a função fetch() do JavaScript para realizar requisições para a API.

Quando um produto ou pedido é cadastrado, alterado ou excluído, a interface é atualizada automaticamente.

## Repositório

GitHub:

https://github.com/PietraOlinger/-Sistema-de-Gest-o-de-Vendas-pt-1

## Vídeo

Apresentação do projeto:

https://youtu.be/ZXe8D5nhr78

## Autora

Pietra Olinger

## Atividade

Sistema de Gestão de Vendas - Parte 3

API REST e CRUD completo utilizando Node.js e Express.