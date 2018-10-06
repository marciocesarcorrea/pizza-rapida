const models = require('../models')
const sequelize = require('sequelize')
exports.get = (req, res) => {

}
exports.create = (req, res) => {
  const { body } = req
  let newPizza
  models.sequelize.transaction({autocommit: false}, (transaction) => {
    return models.Pizza.create({
      TamanhoId: body.tamanho,
      SaborId: body.sabor,
      valor: body.valor,
      tempo: body.tempo,
      createadAt: sequelize.fn('NOW'),
      updatedAt: sequelize.fn('NOW')
    }, {transaction}).then((pizza) => {
      newPizza = pizza
      return pizza.setExtras(JSON.parse(body.extras), {transaction})
    })
  }).then((result) => {
    models.Pizza.findById(newPizza.id, {
      include: [
        { model: models.Tamanho, attributes: ['nome'] },
        { model: models.Sabor, attributes: ['nome'] },
        { model: models.Extra, attributes: ['nome'] }
      ]
    }).then((pizza) => {
      res.status(200).json(pizza)
    }).catch((err) => {
      res.status(500).json(err)
    })
  }).catch((err) => {
    res.status(500).json(err)
  })
}
