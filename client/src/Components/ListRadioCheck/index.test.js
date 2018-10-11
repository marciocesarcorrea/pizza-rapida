import React from 'react'
import ListRadioCheck from './index'

import { render } from 'enzyme'

it('should render', () => {
  const wrapper = render(<ListRadioCheck list={[{id: 0}]} type='radio' id='id' name='name' label={() => ('name')} />)
  expect(wrapper.text()).toBe('name')
})
