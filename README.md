# Lemon Test

Esse projeto é uma mini aplicação contendo um endpoint para validar se o customer está apto a usar os serviços lemon.
Como o teste em si é simples, quis colocar algumas coisas para agregar ao projeto, sendo ela:

1. Clusterização de uma api
2. docker set up
3. tipagem para javascript usando typescript

## Sobre o Código

Como o teste é fazer algumas validações para verificar se o customer está dentro das regras estabelecidas,  
implementei um design pattern chamado `Chain of Responsibility` (https://refactoring.guru/design-patterns/chain-of-responsibility/typescript)  
que faz essas validações de um jeito simples e facil de se alterar.
Esta aplicação foi testada atraves de testes unitários e testes de integração.

## Sobre a arquitetura

Uma arquitetura simples seguindo algumas boas praticas do clean architecture.

## Instalação com Docker

Certifique-se de ter o Docker instalado e rodando na sua maquina.

execute o seguinte comando:

```bash
docker-compose up --build
```

## Instalação sem usar Docker

Certifique-se de ter o node versão 20 LTS na sua maquina.

execute os comandos:

```bash
yarn / npm install
yarn/npm dev
```
