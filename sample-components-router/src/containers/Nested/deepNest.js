import React from 'react'
import { Text } from 'magic-script-components'

export default ({ match }) => (
  <Text>
    {`This is the Nested Route displaying! The param passed in is ${match.params.nestedID}`}
  </Text>
)
