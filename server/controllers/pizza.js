const models = require('../models')
const sequelize = require('sequelize')
exports.get = (req, res) => {

}
exports.create = (req, res) => {
  const { body } = req
  if (body.tamanho && body.sabor && body.extra) {
    const TamanhoId = body.tamanho.id
    const SaborId = body.sabor.id
    const extra = body.extra.map((m) => (m.id))
    const valor = parseFloat(body.tamanho.valor || 0) + parseFloat(body.sabor.valor || 0) + body.extra.reduce((a, b) => +a + +(parseFloat(b.valor) || 0), 0)
    const tempo = (body.tamanho.tempo || 0) + (body.sabor.tempo || 0) + body.extra.reduce((a, b) => +a + +(b.tempo || 0), 0)
    if (TamanhoId && SaborId && extra.length > 0 && valor > 0 && tempo > 0) {
      let newPizza
      models.sequelize.transaction({autocommit: false}, (transaction) => {
        return models.Pizza.create({
          TamanhoId, SaborId, valor, tempo, createadAt: sequelize.fn('NOW'), updatedAt: sequelize.fn('NOW')
        }, {transaction}).then((pizza) => {
          newPizza = pizza
          return pizza.setExtras(extra, {transaction})
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
    } else res.status(500).json({message: 'There was an error validating sent parameters'})
  } else res.status(500).json({message: 'Parameters not found for this request'})
}
