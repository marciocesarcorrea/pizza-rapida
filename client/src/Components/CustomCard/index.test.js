import React from 'react'
import CustomCard from './index'

import { render } from 'enzyme'

it('should render', () => {
  const wrapper = render(<CustomCard header='teste-header' visible />)
  expect(wrapper.text()).toBe('teste-header')
})
