import React from 'react'
import PropTypes from 'prop-types'

import { Form } from 'semantic-ui-react'

const ListRadioCheck = ({list, type, handleChange, id, label, checked, name}) => (
  <Form>
    <Form.Group inline>
      {
        list.map((m) => {
          if (type === 'radio') {
            return (<Form.Radio key={m[id]} label={label(m)} value={m[id]} checked={checked && checked[id] === m[id]} onChange={() => handleChange(m, name)} />)
          } else {
            return (<Form.Checkbox key={m[id]} label={label(m)} value={m[id]} checked={checked && checked.find(f => (f[id] === m[id])) !== undefined} onChange={() => handleChange(m, name)} />)
          }
        })
      }
    </Form.Group>
  </Form>
)
ListRadioCheck.propTypes = {
  list: PropTypes.array.isRequired,
  type: PropTypes.oneOf(['radio', 'check']).isRequired,
  handleChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}
export default ListRadioCheck
