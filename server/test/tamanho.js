/* globals describe, it, beforeEach */

process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../bin/www')
const should = chai.should()

const sequelize = require('sequelize')
const Tamanho = require('../models').Tamanho

chai.use(chaiHttp)

describe('Tamanho', () => {
  beforeEach((done) => {
    Tamanho.destroy({truncate: true, cascade: true}).then((data) => {
      done()
    }).catch((err) => {
      done()
      throw err
    })
  })
  describe('/GET tamanho', () => {
    it('GET tamanhos', (done) => {
      chai.request(server).get('/api/tamanho').end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.be.eql(0)
        done()
      })
    })
  })
  describe('/POST tamanho', () => {
    it('teste POST com campo requerido', (done) => {
      chai.request(server).post('/api/tamanho').send({nome: 'Teste POST campo requerido', tamanho: 1.1}).end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(500)
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors[0].should.have.property('message')
        res.body.errors[0].message.should.a('string', 'Tamanho.tempo cannot be null')
        done()
      })
    })
    it('teste POST tamanho', (done) => {
      chai.request(server).post('/api/tamanho').send({nome: 'Teste POST', valor: 1.1, tempo: 1}).end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('nome')
        res.body.should.have.property('valor')
        res.body.should.have.property('tempo')
        done()
      })
    })
  })
  describe('/GET/:id tamanho', () => {
    it('teste GET um tamanho por ID', (done) => {
      Tamanho.create({nome: 'Teste GET ID', valor: 2.2, tempo: 2, createadAt: sequelize.fn('NOW'), updatedAt: sequelize.fn('NOW')}).then((tamanho) => {
        chai.request(server).get('/api/tamanho/' + tamanho.id).end((err, res) => {
          if (err)console.log(err)
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('nome')
          res.body.should.have.property('tempo')
          res.body.should.have.property('valor')
          res.body.should.have.property('id').eql(tamanho.id)
          done()
        })
      }).catch((err) => {
        done()
        throw err
      })
    })
  })
  describe('/PUT/:id tamanho', () => {
    it('teste PUT tamanho', (done) => {
      Tamanho.create({nome: 'Teste PUT ID', valor: 3.3, tempo: 3, createadAt: sequelize.fn('NOW'), updatedAt: sequelize.fn('NOW')}).then((tamanho) => {
        chai.request(server).patch('/api/tamanho/' + tamanho.id).send({nome: 'Teste PUT ID Alterado', valor: 4.4, tempo: 4}).end((err, res) => {
          if (err)console.log(err)
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body[1][0].should.be.a('object')
          res.body[1][0].should.have.property('nome').eql('Teste PUT ID Alterado')
          res.body[1][0].should.have.property('valor').eql('4.4')
          res.body[1][0].should.have.property('tempo').eql(4)
          done()
        })
      }).catch((err) => {
        done()
        throw err
      })
    })
  })
  describe('/DELETE/:id tamanho', () => {
    it('teste DELETE tamanho', (done) => {
      Tamanho.create({nome: 'Teste DELETE ID', valor: 5.5, tempo: 5, createadAt: sequelize.fn('NOW'), updatedAt: sequelize.fn('NOW')}).then((tamanho) => {
        chai.request(server).delete('/api/tamanho/' + tamanho.id).end((err, res) => {
          if (err) console.log(err)
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('nome').eql('Teste DELETE ID')
          res.body.should.have.property('id').eql(tamanho.id)
          done()
        })
      }).catch((err) => {
        done()
        throw err
      })
    })
  })
})
