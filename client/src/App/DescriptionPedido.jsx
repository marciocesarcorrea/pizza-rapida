import React from 'react'
import PropTypes from 'prop-types'

import { List } from 'semantic-ui-react'

const DescriptionPedido = ({tamanho, sabor, extra}) => (
  <List>
    <List.Item>
      <List.Icon name='check' color='green' />
      <List.Content><b>Tamanho:</b> {tamanho}</List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='check' color='green' />
      <List.Content><b>Sabor:</b> {sabor}</List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='check' color='green' />
      <List.Content><b>Extras:</b> {extra.map((m, i, a) => (m.nome.concat(i + 1 < a.length ? ((i + 1 === a.length - 1) ? ' e ' : ', ') : '')))}</List.Content>
    </List.Item>
  </List>
)
DescriptionPedido.propTypes = {
  tamanho: PropTypes.string.isRequired,
  sabor: PropTypes.string.isRequired,
  extra: PropTypes.array.isRequired
}
export default DescriptionPedido
