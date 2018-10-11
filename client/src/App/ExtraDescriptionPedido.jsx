import React from 'react'
import PropTypes from 'prop-types'

import { Grid } from 'semantic-ui-react'

const ExtraDescriptionPedido = ({tamanho, sabor, extra}) => (
  <Grid>
    <Grid.Row columns={2}>
      <Grid.Column><b>Tempo: </b>{(tamanho.tempo || 0) + (sabor.tempo || 0) + extra.reduce((a, b) => +a + +(b.tempo || 0), 0)} min</Grid.Column>
      <Grid.Column textAlign='right'><b>Valor: </b>
        {((parseFloat(tamanho.valor) || 0) + (parseFloat(sabor.valor) || 0) + extra.reduce((a, b) => +a + +(parseFloat(b.valor) || 0), 0)).toFixed(2)}
      </Grid.Column>
    </Grid.Row>
  </Grid>
)
ExtraDescriptionPedido.propTypes = {
  tamanho: PropTypes.object.isRequired,
  sabor: PropTypes.object.isRequired,
  extra: PropTypes.array.isRequired
}
export default ExtraDescriptionPedido
