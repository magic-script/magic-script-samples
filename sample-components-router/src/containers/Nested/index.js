import React, { Component } from 'react'
import { View, Text, Button, GridLayout } from 'magic-script-components'
import { withRouter, Route } from 'react-router'

import DeepNest from './deepNest'
import paths from '@/constants/paths'
import param from '@/constants/parameter'

class Nested extends Component {
  render() {
    const {
      history,
      match: { path },
    } = this.props

    return (
      <View>
        <Text>
          {`This is the Nested Container located on route ${paths.nested}.
This container contains a parameterized nested route.
Click the show nested route button to navigate to the nested route.`}
        </Text>
        <GridLayout
          columns={2}
          rows={3}
          defaultItemAlignment="center-left"
          defaultItemPadding={[0.01, 0.01, 0.01, 0.01]}
          localPosition={[-0.25, 0.25, 0]}
        >
          <Button width={0.2} onClick={() => history.push(`${path}/${param}`)}>
            Show Nested Route
          </Button>

          <Button width={0.2} onClick={() => history.push(paths.home)}>
            Home
          </Button>

          <Route path={`${path}/:nestedID`} component={DeepNest} />
        </GridLayout>
      </View>
    )
  }
}

export default withRouter(Nested)
