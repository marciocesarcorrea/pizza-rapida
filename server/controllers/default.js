const models = require('../models')
const sequelize = require('sequelize')

const getModelByUrl = (modelUrl) => {
  const nameModel = Object.keys(models).find((item) => (item.toLowerCase() === modelUrl.toLowerCase()))
  return models[nameModel]
}

exports.get = (req, res) => {
  const model = getModelByUrl(req.params.model)
  if (model) {
    if (req.params.id) {
      model.findById(req.params.id).then((data) => {
        res.status(200).json(data)
      }).catch((err) => {
        res.status(500).json(err)
      })
    } else {
      model.findAll().then((data) => {
        res.status(200).json(data)
      }).catch((err) => {
        res.status(500).json(err)
      })
    }
  } else res.status(404).json({message: `Service ${req.params.model} not found!`})
}
exports.create = (req, res) => {
  const { body } = req
  const model = getModelByUrl(req.params.model)
  if (model) {
    model.create({...body, createadAt: sequelize.fn('NOW'), updatedAt: sequelize.fn('NOW')}).then((data) => {
      res.status(200).json(data)
    }).catch((err) => {
      res.status(500).json(err)
    })
  } else res.status(404).json({message: `Service ${req.params.model} not found!`})
}
exports.update = (req, res) => {
  const { body } = req
  const model = getModelByUrl(req.params.model)
  if (model) {
    model.update({
      ...body,
      updatedAt: sequelize.fn('NOW')
    }, {
      returning: true,
      where: {id: req.params.id}
    }).then((data) => {
      res.status(200).json(data)
    }).catch((err) => {
      res.status(500).json(err)
    })
  } else res.status(404).json({message: `Service ${req.params.model} not found!`})
}
exports.remove = (req, res) => {
  const model = getModelByUrl(req.params.model)
  if (model) {
    model.findById(req.params.id).then((record) => {
      if (record) {
        model.destroy({
          where: {id: parseInt(req.params.id, 10)}
        }).then((data) => {
          res.status(200).json(record)
        }).catch((err) => {
          res.status(500).json(err)
        })
      } else res.status(404).json({message: `Record ${req.params.id} not found in service ${req.params.model}!`})
    }).catch((err) => {
      res.status(500).json(err)
    })
  } else res.status(404).json({message: `Service ${req.params.model} not found!`})
}
