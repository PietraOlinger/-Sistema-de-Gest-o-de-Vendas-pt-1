# Sistema de Gestão de Vendas - Atividade 2

## Descrição

Este projeto é a evolução da Atividade 1 e foi desenvolvido para auxiliar pequenos comerciantes no controle de vendas, cadastro de produtos, organização de pedidos e consulta de endereços por CEP.

Na Atividade 2, o sistema ganhou um back-end em Node.js, além de conceitos de Programação Orientada a Objetos (POO), manipulação de dados em arquivos JSON e operações assíncronas com Async/Await.

## Objetivo da atividade

Ampliar o sistema anterior adicionando:

- Back-end com Node.js;
- POO com classes para produtos e pedidos;
- Armazenamento e manipulação de dados em arquivos JSON;
- Operações assíncronas para consulta de CEP.

## Funcionalidades

- Cadastro de produtos pelo navegador e pelo terminal;
- Listagem de produtos cadastrados;
- Cálculo da média de preços;
- Registro de pedidos;
- Consulta de CEP por meio da API ViaCEP;
- Armazenamento persistente em arquivos JSON;
- Interface web integrada com o back-end.

## Tecnologias utilizadas

- Node.js
- JavaScript
- HTML
- CSS
- API ViaCEP
- JSON

## Estrutura do projeto

```text
Sistema-de-Gestao-de-Vendas/
├── server.js
├── cli.js
├── package.json
├── index.html
├── script.js
├── style.css
├── public/
│   ├── index.html
│   ├── script.js
│   └── public/
│       └── style.css
├── src/
│   ├── models/
│   │   ├── Produto.js
│   │   ├── Perfume.js
│   │   └── Pedido.js
│   ├── repositories/
│   │   └── jsonRepository.js
│   └── services/
│       └── cepService.js
├── data/
│   ├── produtos.json
│   └── pedidos.json
└── README.md
```

## Como executar

### 1. Instalar o Node.js

Certifique-se de que o Node.js está instalado na máquina.

### 2. Iniciar o servidor

No terminal, execute:

```bash
npm start
```

O servidor será iniciado em:

```text
http://localhost:3000
```

### 3. Abrir a interface web

Acesse o navegador no endereço acima para usar o sistema.

### 4. Usar o modo CLI

Também é possível usar o sistema via terminal:

```bash
npm run cli
```

## Como o sistema funciona

- O back-end recebe requisições do front-end e responde com dados em JSON.
- Os modelos de Produto, Perfume e Pedido usam POO para organizar o código.
- Os dados são salvos em arquivos JSON, simulando um banco de dados simples.
- A consulta de CEP utiliza Async/Await para buscar informações de forma assíncrona.

## Observações

Este projeto complementa a Atividade 1 ao adicionar uma camada de back-end, melhor organização do código e funcionalidades mais próximas de um sistema real de gestão de vendas.

