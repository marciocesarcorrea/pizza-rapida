import React from 'react'
import DescriptionPedido from './DescriptionPedido'
import { render } from 'enzyme'

it('should render', () => {
  const wrapper = render(<DescriptionPedido tamanho='tamanho' sabor='sabor' extra={[{nome: 'test'}]} />)
  // console.log(expect(wrapper.text()))
  expect(wrapper.text()).toContain('test')
})
