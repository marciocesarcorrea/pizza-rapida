'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Sabor', [
      { nome: 'Calabresa', valor: 0.00, tempo: 0, createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Marguerita', valor: 0.00, tempo: 0, createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Portuguesa', valor: 0.00, tempo: 5, createdAt: new Date(), updatedAt: new Date() }
    ], {})
  },

  down: (queryInterface, Sequelize) => { }
}
