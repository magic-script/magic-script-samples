import React, { Component } from 'react'
import { View, Text, Button, GridLayout } from 'magic-script-components'
import { withRouter } from 'react-router'

import paths from '@/constants/paths'

class Parameterized extends Component {
  render() {
    const {
      history,
      match: { params },
    } = this.props

    return (
      <View>
        <Text>
          {`This is the Parameterized Container located on route ${paths.paramed}.
The current param passed to this route is ${params.id}.`}
        </Text>
        <GridLayout
          columns={2}
          rows={2}
          defaultItemAlignment="center-left"
          defaultItemPadding={[0.01, 0.01, 0.01, 0.01]}
          localPosition={[-0.25, 0.25, 0]}
        >
          <Button width={0.2} onClick={() => history.push(paths.home)}>
            Home
          </Button>

          <Button width={0.2} onClick={() => history.push(paths.primary)}>
            Primary Container
          </Button>

          <Button
            width={0.2}
            onClick={() => history.push(`${paths.query}?foo=bar&baz=fuz`)}
          >
            Query Container
          </Button>

          <Button width={0.2} onClick={() => history.goBack()}>
            Back 1 Route
          </Button>

          <Button width={0.2} onClick={() => history.goForward()}>
            Forward 1 Route
          </Button>
        </GridLayout>
      </View>
    )
  }
}

export default withRouter(Parameterized)
