const models = require('../models')
exports.get = async (req, res) => {
  try {
    const tamanhos = await models.Tamanho.findAll()
    const sabores = await models.Sabor.findAll()
    const extras = await models.Extra.findAll()
    res.status(200).json({tamanhos, sabores, extras})
  } catch (err) {
    res.status(500).json(err)
  }
}
