'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tamanho', [
      { nome: 'Pequena', valor: 20.00, tempo: 15, createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Média', valor: 30.00, tempo: 20, createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Grande', valor: 40.00, tempo: 25, createdAt: new Date(), updatedAt: new Date() }
    ], {})
  },
  down: (queryInterface, Sequelize) => { }
}
