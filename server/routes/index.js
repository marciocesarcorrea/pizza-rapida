const express = require('express')
const router = express.Router()

const defaultCtrl = require('../controllers/default')
const tamSabExtCtrl = require('../controllers/tamSabExt')
const pizzaCtrl = require('../controllers/pizza')
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' })
})
router.post('/pizza', pizzaCtrl.create)
router.get('/itens', tamSabExtCtrl.get)
router.get('/:model/:id?', defaultCtrl.get)
router.post('/:model', defaultCtrl.create)
router.patch('/:model/:id', defaultCtrl.update)
router.delete('/:model/:id', defaultCtrl.remove)
module.exports = router
