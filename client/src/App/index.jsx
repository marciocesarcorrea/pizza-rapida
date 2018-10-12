import React from 'react'
import { connect } from 'react-redux'

import { searchItens, setItem, setResumo } from '../redux/modules/itensData'
import { fazPedido } from '../redux/modules/pedido'

import { Segment, Image, Button, Transition, Message } from 'semantic-ui-react'

import CustomCard from '../Components/CustomCard'
import ListRadioCheck from '../Components/ListRadioCheck'
import DescriptionPedido from './DescriptionPedido'
import ExtraDescriptionPedido from './ExtraDescriptionPedido'

import logo from '../assets/images/logo.png'
import delivery from '../assets/images/delivery.gif'

import './style.css'

class App extends React.Component {
  componentDidMount = () => this.props.searchItens()

  handleChange = (t, target) => this.props.setItem({t, target})
  handlePedir = () => this.props.setResumo(true)
  handleConfirma = (confirmado, tamanho, sabor, extra) => {
    if(!confirmado) this.props.fazPedido({tamanho,sabor,extra})
    else this.props.searchItens()
  }
  render () {
    const {tamanho, sabor, extra, mostraResumo, loading, error, tamanhos, sabores, extras} = this.props.itensData
    const { pedido } = this.props
    return (
      <React.Fragment>
        <Segment loading={loading || pedido.loading} className='root'>
          <Image src={logo} size='small' centered />
          {error && <Message negative><Message.Header>Ops!</Message.Header><p>{error}</p></Message>}
          <CustomCard visible={!mostraResumo && !error} header='Tamanho' meta='Qual o tamanho de sua fome?' description={
            <ListRadioCheck list={tamanhos} type='radio' handleChange={this.handleChange} id='id'
              label={(o)=>(`${o.nome} (R$ ${parseFloat(o.valor).toFixed(2)})`)}
              checked={tamanho} name='tamanho'
            />
          }/>
          <CustomCard visible={(tamanho && !mostraResumo) ? true : false} header='Sabores' meta='Qual sabor você prefere?' description={
            <ListRadioCheck list={sabores} type='radio' handleChange={this.handleChange} id='id' label={(o)=>(o.nome)} checked={sabor} name='sabor' />
          }/>
          <CustomCard visible={(tamanho && sabor && !mostraResumo) ? true : false} header='Extras' meta='Que tal dar um upgrade nesta pizza?' description={
            <ListRadioCheck list={extras} type='check' handleChange={this.handleChange} id='id'
              label={(o)=>(o.nome + (o.valor > 0 ? ` (R$ ${parseFloat(o.valor).toFixed(2)})` : ''))}
              checked={extra} name='extra'
            />
          }/>
          <Transition visible={(tamanho && sabor && extra.length>0 && !mostraResumo) ? true : false} animation='fade' duration={500}>
            <Button color='green' fluid onClick={()=>this.handlePedir()}>Pedir minha pizza</Button>
          </Transition>
          <CustomCard visible={mostraResumo} header='Pronto!' meta={pedido.confirmado?'Agora é só aguardar!':'Confira como sua pizza ficou!'}
            description={
              pedido.confirmado ? (<Image src={delivery} size='small' centered />) : (tamanho && sabor && extra && <DescriptionPedido tamanho={tamanho.nome} sabor={sabor.nome} extra={extra} />)
            }
            extraDesc={tamanho && sabor && extra && <ExtraDescriptionPedido tamanho={tamanho} sabor={sabor} extra={extra} />}
          />
          <Transition visible={mostraResumo} animation='fade' duration={500}>
            <Button color={pedido.confirmado?'grey':'green'} fluid onClick={()=>this.handleConfirma(pedido.confirmado, tamanho, sabor, extra)}>
              {pedido.confirmado?'Começar um novo!':'Confirmar meu pedido'}
            </Button>
          </Transition>
        </Segment>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, props) => ({
  itensData: state.itensData,
  pedido: state.pedido
})
const mapDispatchToProps = {
  searchItens,
  setItem,
  setResumo,
  fazPedido
}

export default connect(mapStateToProps, mapDispatchToProps)(App)