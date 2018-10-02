import React from 'react'

import { Segment, Image, Card, Form, Button, Transition, List, Grid } from 'semantic-ui-react'

import './style.css'
import logo from '../assets/images/logo.png'
import delivery from '../assets/images/delivery.gif'

const tamanhos = [
  {id: 1, nome: 'Pequena', valor: 20.00, tempo: 15},
  {id: 2, nome: 'Média', valor: 30.00, tempo: 20},
  {id: 3, nome: 'Grande', valor: 40.00, tempo: 25}
]
const sabores = [
  {id: 1, nome: 'Calabresa'},
  {id: 2, nome: 'Marguerita'},
  {id: 3, nome: 'Portuguesa', tempo: 5}
]
const extras = [
  {id: 1, nome: 'Extra bacon', valor: 3.00},
  {id: 2, nome: 'Sem cebola'},
  {id: 3, nome: 'Borda recheada', valor: 5.00, tempo: 5}
]
const inicialState = { tamanho: undefined, sabor: undefined, extra: [], mostraResumo: false, pedidoConfirmado: false }
class App extends React.Component {
  state = inicialState
  handleChange = (t, target) => {
    if(target === 'extra'){
      const extra = this.state.extra
      if(extra.find((f)=>(f.id === t.id))) this.setState({[target]:extra.filter((f)=>(f.id !== t.id))})
      else this.setState({[target]:extra.concat(t)})
    }else this.setState({[target]:t})
  }
  handlePedir = () => this.setState({mostraResumo:true})
  handleConfirma = (pedidoConfirmado, tamanho, sabor, extra) => {
    if(pedidoConfirmado) this.setState(inicialState)
    else this.setState({pedidoConfirmado: true})
  }
  render () {
    const {tamanho, sabor, extra, mostraResumo, pedidoConfirmado} = this.state
    return (
      <Segment className='root'>
        <Image src={logo} size='small' centered />
        <Transition visible={!mostraResumo} animation='fade' duration={500}>
          <Card fluid>
            <Card.Content>
              <Card.Header>Tamanho</Card.Header>
              <Card.Meta>Qual o tamanho de sua fome?</Card.Meta>
              <Card.Description>
                <Form>
                  <Form.Group inline>
                    {
                      tamanhos.map((m) => (
                        <Form.Radio key={m.id} label={`${m.nome} (R$ ${m.valor.toFixed(2)})`} value={m.id} checked={tamanho && tamanho.id === m.id} onChange={() => this.handleChange(m, 'tamanho')} />
                      ))
                    }
                  </Form.Group>
                </Form>
              </Card.Description>
            </Card.Content>
          </Card>
        </Transition>
        <Transition visible={(tamanho && !mostraResumo) ? true : false} animation='fade' duration={500}>
          <Card fluid>
          <Card.Content>
            <Card.Header>Sabores</Card.Header>
            <Card.Meta>Qual sabor você prefere?</Card.Meta>
            <Card.Description>
              <Form>
                <Form.Group inline>
                  {
                    sabores.map((m) => (
                      <Form.Radio key={m.id} label={m.nome} value={m.id} checked={sabor && sabor.id === m.id} onChange={() => this.handleChange(m, 'sabor')} />
                    ))
                  }
                </Form.Group>
              </Form>
            </Card.Description>
          </Card.Content>
        </Card>
        </Transition>
        <Transition visible={(tamanho && sabor && !mostraResumo) ? true : false} animation='fade' duration={500}>
          <Card fluid>
            <Card.Content>
              <Card.Header>Extras</Card.Header>
              <Card.Meta>Que tal dar um upgrade nesta pizza?</Card.Meta>
              <Card.Description>
                <Form>
                  <Form.Group inline>
                    {
                      extras.map((m) => (
                        <Form.Checkbox key={m.id} label={m.nome + (m.valor ? ` (R$ ${m.valor.toFixed(2)})` : '')} value={m.id} checked={extra && extra.find((f=>(f.id === m.id)))!==undefined} onChange={() => this.handleChange(m, 'extra')} />
                      ))
                    }
                  </Form.Group>
                </Form>
              </Card.Description>
            </Card.Content>
          </Card>
        </Transition>
        <Transition visible={(tamanho && sabor && extra.length>0 && !mostraResumo) ? true : false} animation='fade' duration={500}>
          <Button color='green' fluid onClick={()=>this.handlePedir()}>Pedir minha pizza</Button>
        </Transition>
        <Transition visible={mostraResumo} animation='fade' duration={500}>
          <Card fluid>
              <Card.Content>
                <Card.Header>Pronto!</Card.Header>
                <Card.Meta>{pedidoConfirmado?'Agora é só aguardar!':'Confira como sua pizza ficou!'}</Card.Meta>
                <Card.Description>
                  {
                    pedidoConfirmado ? (<Image src={delivery} size='small' centered />) : (
                      <List>
                        <List.Item>
                          <List.Icon name='check' color='green' />
                          <List.Content><b>Tamanho:</b> {tamanho && tamanho.nome}</List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Icon name='check' color='green' />
                          <List.Content><b>Sabor:</b> {sabor && sabor.nome}</List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Icon name='check' color='green' />
                          <List.Content><b>Extras:</b> {extra.map((m, i, a)=>(m.nome.concat(i+1<a.length ? ((i+1===a.length-1) ? ' e ' : ', ') : '')))}</List.Content>
                        </List.Item>
                      </List>
                    )
                  }
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column><b>Tempo:</b> {(tamanho && (tamanho.tempo || 0)) + (sabor && (sabor.tempo || 0)) + extra.reduce((a, b) => +a + +(b.tempo || 0), 0)} min</Grid.Column>
                    <Grid.Column textAlign='right'><b>Valor:</b> {((tamanho && (tamanho.valor || 0)) + (sabor && (sabor.valor || 0)) + extra.reduce((a, b) => +a + +(b.valor || 0), 0)).toFixed(2)}</Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card.Content>
            </Card>
        </Transition>
        <Transition visible={mostraResumo} animation='fade' duration={500}>
          <Button color={pedidoConfirmado?'grey':'green'} fluid onClick={()=>this.handleConfirma(pedidoConfirmado, tamanho, sabor, extra)}>{pedidoConfirmado?'Começar um novo!':'Confirmar meu pedido'}</Button>
        </Transition>
      </Segment>
    )
  }
}

export default App
