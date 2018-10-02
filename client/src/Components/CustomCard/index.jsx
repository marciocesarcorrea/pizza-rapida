import React from 'react'
import PropTypes from 'prop-types'

import { Card, Transition } from 'semantic-ui-react'

const CustomCard = ({header, meta, description, extraDesc, visible}) => (
  <Transition visible={visible} animation='fade' duration={250}>
    <Card fluid>
      <Card.Content>
        <Card.Header>{header}</Card.Header>
        <Card.Meta>{meta}</Card.Meta>
        <Card.Description>
          {description}
        </Card.Description>
      </Card.Content>
      {extraDesc && <Card.Content extra>{extraDesc}</Card.Content>}
    </Card>
  </Transition>
)
CustomCard.propTypes = {
  header: PropTypes.string.isRequired,
  meta: PropTypes.string,
  description: PropTypes.element.isRequired,
  extraDesc: PropTypes.element,
  visible: PropTypes.bool.isRequired
}
export default CustomCard
