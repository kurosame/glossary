import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

import AllowPush from '@/containers/AllowPush'
import Category from '@/containers/Category'
import List from '@/containers/List'
import Login from '@/containers/Login'
import '@/modules/states'
import store from '@/store'
import { initialize } from '@/sw/fcm'

initialize()

render(
  <Provider store={store}>
    <MuiThemeProvider theme={createMuiTheme()}>
      <Router>
        <>
          <Route path="/" component={Login} />
          <Route path="/" component={AllowPush} />
          <Route path="/" component={Category} />
          <Route path="/" component={List} exact />
          <Route path="/:category" component={List} exact />
        </>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement
)
