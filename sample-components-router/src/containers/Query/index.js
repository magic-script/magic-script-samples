import React, { Component } from 'react'
import { View, Text, Button, GridLayout } from 'magic-script-components'
import { withRouter } from 'react-router'

import paths from '@/constants/paths'
import param from '@/constants/parameter'

class Query extends Component {
  render() {
    const {
      history,
      location: { search },
    } = this.props

    return (
      <View>
        <Text>
          {`This is the Query Container located on route ${paths.query}.
The current query string passed to this route is: 
${search}`}
        </Text>

        <GridLayout
          columns={2}
          rows={3}
          defaultItemAlignment="center-left"
          defaultItemPadding={[0.01, 0.01, 0.01, 0.01]}
          localPosition={[-0.25, 0.25, 0]}
        >
          <Button width={0.2} onClick={() => history.push(paths.home)}>
            Home Container
          </Button>

          <Button width={0.2} onClick={() => history.push(paths.primary)}>
            Primary Container
          </Button>

          <Button width={0.2} onClick={() => history.push(`param/${param}`)}>
            Paramed Container
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

export default withRouter(Query)
