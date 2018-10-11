import React from 'react'
import ExtraDescriptionPedido from './ExtraDescriptionPedido'
import { render } from 'enzyme'

it('should render', () => {
  const wrapper = render(<ExtraDescriptionPedido tamanho={{tempo: 1, valor: 1}} sabor={{tempo: 1, valor: 1}} extra={[{tempo: 1, valor: 1}]} />)
  // console.log(wrapper.text())
  expect(wrapper.text()).toContain('Tempo: 3')
})
