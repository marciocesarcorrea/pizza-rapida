'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.bulkDelete('Extra', null, {}).then((r) => (
      queryInterface.bulkInsert('Extra', [
        { nome: 'Extra Bacon', valor: 3.00, tempo: 0, createdAt: new Date(), updatedAt: new Date() },
        { nome: 'Sem cebola', valor: 0.00, tempo: 0, createdAt: new Date(), updatedAt: new Date() },
        { nome: 'Borda Recheada', valor: 10.00, tempo: 5, createdAt: new Date(), updatedAt: new Date() }
      ], {})
    ))
  ),
  down: (queryInterface, Sequelize) => {}
}
