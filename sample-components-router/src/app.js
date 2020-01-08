//
import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router'
import { View } from 'magic-script-components'

import history from '@/utils/history'
import routes from '@/constants/routes'

export default class MyApp extends Component {
  render() {
    return (
      <View name="main-view">
        <Router history={history}>
          <Switch>
            {routes.map((props, idx) => (
              <Route key={`Route__${idx}`} {...props} />
            ))}
          </Switch>
        </Router>
      </View>
    )
  }
}
