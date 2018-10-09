import React from 'react'
import { connect } from 'react-redux'

import { searchItens, setItem, setResumo } from '../redux/modules/itensData'

import { Segment, Image, Button, Transition, Grid, Dimmer, Loader, Message } from 'semantic-ui-react'
import CustomCard from '../Components/CustomCard'
import ListRadioCheck from '../Components/ListRadioCheck'
import DescriptionPedido from './DescriptionPedido'
import logo from '../assets/images/logo.png'
import delivery from '../assets/images/delivery.gif'

import './style.css'

class App extends React.Component {
  componentDidMount = () => this.props.searchItens()

  handleChange = (t, target) => this.props.setItem({t, target})
  handlePedir = () => this.props.setResumo()
  handleConfirma = (pedidoConfirmado, tamanho, sabor, extra) => {
    // if(pedidoConfirmado) this.setState(inicialState)
    // else this.setState({pedidoConfirmado: true})
  }
  render () {
    const {tamanho, sabor, extra, mostraResumo, pedidoConfirmado, loading, error, tamanhos, sabores, extras} = this.props.itensData
    return (
      <React.Fragment>
        <Dimmer active={loading}><Loader indeterminate>Buscando Pizzas!</Loader></Dimmer>
        <Segment className='root'>
          <Image src={logo} size='small' centered />
          {error && <Message negative><Message.Header>Ops!</Message.Header><p>{error}</p></Message>}
          <CustomCard visible={!mostraResumo} header='Tamanho' meta='Qual o tamanho de sua fome?' description={
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
              label={(o)=>(o.nome + (o.valor ? ` (R$ ${parseFloat(o.valor).toFixed(2)})` : ''))}
              checked={extra} name='extra'
            />
          }/>
          <Transition visible={(tamanho && sabor && extra.length>0 && !mostraResumo) ? true : false} animation='fade' duration={500}>
            <Button color='green' fluid onClick={()=>this.handlePedir()}>Pedir minha pizza</Button>
          </Transition>
          <CustomCard visible={mostraResumo} header='Pronto!' meta={pedidoConfirmado?'Agora é só aguardar!':'Confira como sua pizza ficou!'}
            description={
              pedidoConfirmado ? (<Image src={delivery} size='small' centered />) : (tamanho && sabor && extra && <DescriptionPedido tamanho={tamanho.nome} sabor={sabor.nome} extra={extra} />)
            }
            extraDesc={
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column><b>Tempo:</b> {(tamanho && (tamanho.tempo || 0)) + (sabor && (sabor.tempo || 0)) + extra.reduce((a, b) => +a + +(b.tempo || 0), 0)} min</Grid.Column>
                  <Grid.Column textAlign='right'><b>Valor:</b> 
                    {
                      (
                        (tamanho && (parseFloat(tamanho.valor) || 0)) + (sabor && (parseFloat(sabor.valor) || 0)) + extra.reduce((a, b) => +a + +(parseFloat(b.valor) || 0), 0)
                      ).toFixed(2)
                    }
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            }
          />
          <Transition visible={mostraResumo} animation='fade' duration={500}>
            <Button color={pedidoConfirmado?'grey':'green'} fluid
              onClick={()=>this.handleConfirma(pedidoConfirmado, tamanho, sabor, extra)}
            >
              {pedidoConfirmado?'Começar um novo!':'Confirmar meu pedido'}
            </Button>
          </Transition>
        </Segment>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, props) => ({itensData: state.itensData})
const mapDispatchToProps = {
  searchItens,
  setItem,
  setResumo
}

export default connect(mapStateToProps, mapDispatchToProps)(App)