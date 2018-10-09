const express = require('express')
const router = express.Router()

const defaultCtrl = require('../controllers/default')
const tamSabExtCtrl = require('../controllers/tamSabExt')
const pizzaCtrl = require('../controllers/pizza')
router.post('/api/pizza', pizzaCtrl.create)
router.get('/api/itens', tamSabExtCtrl.get)
router.get('/api/:model/:id?', defaultCtrl.get)
router.post('/api/:model', defaultCtrl.create)
router.patch('/api/:model/:id', defaultCtrl.update)
router.delete('/api/:model/:id', defaultCtrl.remove)
module.exports = router
