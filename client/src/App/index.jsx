import React from 'react'

import { Segment, Image, Button, Transition, List, Grid } from 'semantic-ui-react'

import CustomCard from '../Components/CustomCard'
import ListRadioCheck from '../Components/ListRadioCheck'

import logo from '../assets/images/logo.png'
import delivery from '../assets/images/delivery.gif'

import './style.css'

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
        <CustomCard visible={!mostraResumo} header='Tamanho' meta='Qual o tamanho de sua fome?' description={
          <ListRadioCheck list={tamanhos} type='radio' handleChange={this.handleChange} id='id' label={(o)=>(`${o.nome} (R$ ${o.valor.toFixed(2)})`)} checked={tamanho} name='tamanho' />
        }/>
        <CustomCard visible={(tamanho && !mostraResumo) ? true : false} header='Sabores' meta='Qual sabor você prefere?' description={
          <ListRadioCheck list={sabores} type='radio' handleChange={this.handleChange} id='id' label={(o)=>(o.nome)} checked={sabor} name='sabor' />
        }/>
        <CustomCard visible={(tamanho && sabor && !mostraResumo) ? true : false} header='Extras' meta='Que tal dar um upgrade nesta pizza?' description={
          <ListRadioCheck list={extras} type='check' handleChange={this.handleChange} id='id' label={(o)=>(o.nome + (o.valor ? ` (R$ ${o.valor.toFixed(2)})` : ''))} checked={extra} name='extra' />
        }/>
        <Transition visible={(tamanho && sabor && extra.length>0 && !mostraResumo) ? true : false} animation='fade' duration={500}>
          <Button color='green' fluid onClick={()=>this.handlePedir()}>Pedir minha pizza</Button>
        </Transition>
        <CustomCard visible={mostraResumo} header='Pronto!' meta={pedidoConfirmado?'Agora é só aguardar!':'Confira como sua pizza ficou!'} description={
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
        } extraDesc={
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column><b>Tempo:</b> {(tamanho && (tamanho.tempo || 0)) + (sabor && (sabor.tempo || 0)) + extra.reduce((a, b) => +a + +(b.tempo || 0), 0)} min</Grid.Column>
              <Grid.Column textAlign='right'><b>Valor:</b> {((tamanho && (tamanho.valor || 0)) + (sabor && (sabor.valor || 0)) + extra.reduce((a, b) => +a + +(b.valor || 0), 0)).toFixed(2)}</Grid.Column>
            </Grid.Row>
          </Grid>
        }/>
        <Transition visible={mostraResumo} animation='fade' duration={500}>
          <Button color={pedidoConfirmado?'grey':'green'} fluid onClick={()=>this.handleConfirma(pedidoConfirmado, tamanho, sabor, extra)}>{pedidoConfirmado?'Começar um novo!':'Confirmar meu pedido'}</Button>
        </Transition>
      </Segment>
    )
  }
}

export default App
