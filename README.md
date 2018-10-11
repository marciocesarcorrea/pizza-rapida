# Pizza Rápida
Exemplo de aplicação React desenvolvida com:

- [create-react-app](https://github.com/facebook/create-react-app)
- [react-semantic-ui](https://github.com/Semantic-Org/Semantic-UI-React)
- [react-redux](https://github.com/reduxjs/react-redux)
- [redux-saga](https://github.com/redux-saga/redux-saga)
- [enzime](https://github.com/airbnb/enzyme)
- [expressjs](https://github.com/expressjs/express/)
- [sequelizejs](https://github.com/sequelize/sequelize)

O projeto foi publicado em https://pizza-uds.herokuapp.com e caso queira testar o último build basta clicar no botão abaixo para criar uma nova aplicação.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/marciocesarcorrea/uds-pizza/tree/master/server)


## Para testes locais
1. Clonar o repositório `https://github.com/marciocesarcorrea/uds-pizza.git`
2. Entre na pasta `uds-pizza\server` e `uds-pizza\client` e execute o comando `npm install` em cada uma delas
4. Antes de rodar o servidor será necessário configurar a conexão com o banco de dados no arquivo `config.json` da pasta `uds-pizza\server\config`:
```js
"development": {
  "username": "USUARIO",
  "password": "SENHA",
  "database": "NOME",
  "host": "ENDERECO",
  "port": "POSTA",
  "dialect": "DIALETO"
}
```
`Atenção: Foram adicionadas algumas dependências do banco PostgreSQL no servidor, caso o teste seja feito em outro dialeto, será necessário altera-las`

5. Execute o comando na pasta `uds-pizza\server` para que as tabelas do banco sejam criadas e populadas:
```js
$ npm postinstall
```
6. Para rodar o servidor execute o comando `npm start` na pasta `uds-pizza\server`
7. Para rodar o cliente react execute o comando `npm start` na pasta `uds-pizza\client`

## Contribuição
- [Max Rogério](https://github.com/max10rogerio/) pela correção no pacote do [sequelize-auto-migrations](https://github.com/max10rogerio/sequelize-auto-migrations/)